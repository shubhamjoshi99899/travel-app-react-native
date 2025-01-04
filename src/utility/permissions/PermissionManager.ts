import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

import { PermissionType, PlatformType } from './PermissionsList';
import { Permission, requestManualPermission } from './PermissionWorkers';

class Permissions {
  private platform: any;
  constructor(platform: any) {
    this.platform = platform;
  }
  async getPermission(permissionType: PermissionType) {
    return Permission(permissionType, this.platform, 'get');
  }
  async checkPermissions(perm: PermissionType, callbackOnDenied?: Function) {
    return Permission(
      perm,
      this.platform,
      'check',
      callbackOnDenied ?? callbackOnDenied,
    );
  }
  async locationEnabler(): Promise<boolean> {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, (error) => reject(error), {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        });
      });

      if (position) {
        return true;
      }
    } catch (error: any) {
      console.log('Error getting location:', error.message);
      if (error.code === 1) {
        console.log('Location permission denied');
      } else if (error.code === 2) {
        console.log('Location position unavailable');
      } else if (error.code === 3) {
        console.log('Location request timed out');
      }
    }

    return false;
  }

  async requestStoragePermission(): Promise<boolean> {
    try {
      if (Number(Platform.Version) >= 33) {
        return true;
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Download Permission',
          message: 'Your permission is required to save Files to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      requestManualPermission('write external storage');
      return false;
    } catch (err) {
      return false;
    }
  }

  async requestAppTrackingPermission() {
    if (this.platform === PlatformType.IOS) {
      const trackingStatus = await getTrackingStatus();
      if (trackingStatus === 'denied') {
        requestManualPermission('App Tracking Permission');
      }
      if (trackingStatus === 'not-determined') {
        requestTrackingPermission();
      }
    } else {
      return;
    }
  }
}
export const PermissionManager = new Permissions(Platform.OS);
