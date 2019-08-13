import { getFirebaseRef, getFirebaseValue } from '@utils/firebase';
import each from 'lodash/each';
import findKey from 'lodash/findKey';
import map from 'lodash/map';
import invert from 'lodash/invert';

export function getName(server) {
  const name = `${server.firstName} ${server.lastName}`;

  if (server.type === 'pos') {
    return `${name} (POS)`;
  }

  return name;
}

// NOTE copied logic over from ReservationService.getServer
export function getServer(venue, server) {
  const userPromise = getFirebaseValue(`users/${server}`);
  const posEmployeePromise = getFirebaseValue(
    `venues/${venue}/pos/employees/${server}`
  );
  const posEmployeeUserPromise = getFirebaseValue(
    `venues/${venue}/pos_employees^users/${server}`
  );

  return Promise.all([
    posEmployeePromise,
    posEmployeeUserPromise,
    userPromise
  ]).then(function(result) {
    const posEmployee = result[0];
    const userId = result[1];
    const user = result[2];

    if (user) {
      return user;
    }

    if (userId) {
      return getFirebaseValue(`users/${userId}`);
    }

    return {
      _id: posEmployee.id,
      firstName: posEmployee.first_name,
      lastName: posEmployee.last_name,
      type: 'pos'
    };
  });
}

// NOTE copied logic over from ReservationService.getVenueServers
export function getVenueServers(venue) {
  const baseRef = getFirebaseRef();
  const venueRef = baseRef.child('venues').child(venue);

  const serverRoleIdPromise = venueRef
    .child('roles')
    .once('value')
    .then(snap => {
      return findKey(snap.val(), function(val) {
        return val.name === 'Server';
      });
    });

  const venueUsersPromise = venueRef
    .child('users')
    .once('value')
    .then(snap => snap.val());

  const posEmployeesPromise = venueRef
    .child('pos')
    .child('employees')
    .once('value')
    .then(snap => {
      const posEmployees = [];

      each(snap.val(), function(employee, id) {
        posEmployees.push({
          _id: id,
          firstName: employee.first_name,
          lastName: employee.last_name,
          type: 'pos'
        });
      });

      return posEmployees;
    });

  const userEmployeePromise = venueRef
    .child('pos_employees^users')
    .once('value')
    .then(snap => snap.val());

  return Promise.all([
    serverRoleIdPromise,
    venueUsersPromise,
    posEmployeesPromise,
    userEmployeePromise
  ]).then(results => {
    const serverRoleId = results[0],
      venueUsers = results[1],
      posEmployees = results[2],
      posEmployeeUserMap = results[3] || {};

    const promiseArray = map(venueUsers, function(val, userId) {
      return baseRef
        .child('users^venues')
        .child(userId)
        .child(venue)
        .once('value')
        .then(snap => {
          const userObj = snap.val();

          if (
            userObj === null ||
            userObj.role === null ||
            userObj.role !== serverRoleId
          ) {
            return null;
          } else {
            return baseRef
              .child('users')
              .child(userId)
              .once('value')
              .then(userSnap => {
                const user = userSnap.val();

                user._id = userId;
                return user;
              });
          }
        });
    });

    return Promise.all(promiseArray).then(users => {
      const userEmployeeMap = invert(posEmployeeUserMap);
      const servers = users
        .filter(user => user !== null)
        .map(user => {
          if (userEmployeeMap[user._id]) {
            user.employeeID = userEmployeeMap[user._id];
          }

          return user;
        });

      return servers.concat(posEmployees).filter(user => {
        return !posEmployeeUserMap[user._id];
      });
    });
  });
}
