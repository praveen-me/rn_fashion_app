import {Alert, Linking} from 'react-native';
import Permissions, {
  request,
  RESULTS,
  type Permission,
  type PermissionStatus,
} from 'react-native-permissions';

type IPermissionsEnabled = {
  name: Permission;
  optional?: boolean;
  shouldRequestAgain?: boolean;
}[];

function showAlert(permissionName: string) {
  Alert.alert(
    'Permission Required',
    `${permissionName} permission is required`,
    [
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'destructive',
      },
    ],
  );
}

async function requestPermission(name: Permission) {
  return await request(name);
}

export async function permissionEnabled(config: IPermissionsEnabled) {
  const resultMap: Record<string, PermissionStatus> = {};

  const results = await Permissions.checkMultiple(config.map(p => p.name));

  for (const {name, optional} of config) {
    const permissionResult = results[name];

    if (
      permissionResult !== RESULTS.GRANTED &&
      permissionResult !== RESULTS.UNAVAILABLE
    ) {
      const triedResult = await requestPermission(name);

      resultMap[name] = triedResult;

      if (triedResult !== RESULTS.GRANTED && !optional) {
        showAlert(name.split('.')[2]);
      }
    } else {
      resultMap[name] = permissionResult;
    }
  }

  const allGranted = config.every(
    permission =>
      permission.optional || resultMap[permission.name] === RESULTS.GRANTED,
  );

  return allGranted;
}
