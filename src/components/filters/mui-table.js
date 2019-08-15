import React from 'react';
import { Select } from '@components/common';
import { FirebaseSelect } from '@components/firebase';
import { NumberRangeFilter } from './index';

export function numberRange(label) {
  return {
    filterType: 'custom',
    customFilterListRender: v => {
      if (v[0] && v[1]) {
        return `Min ${label}: $${v[0]}, Max ${label}: $${v[1]}`;
      } else if (v[0]) {
        return `Min ${label}: $${v[0]}`;
      } else if (v[1]) {
        return `Max ${label}: $${v[1]}`;
      }
      return null;
    },
    filterOptions: {
      display: (filterList, onChange, index, column) => {
        return (
          <NumberRangeFilter
            value={filterList[index]}
            onChange={v => onChange(v, index, column)}
            label={label}
          />
        );
      }
    }
  };
}

export function firebaseSingle(label, getPath, getOptionLabel) {
  return {
    filterType: 'custom',
    customFilterListRender: v =>
      v[0] ? `${label}: ${getOptionLabel(v[0])}` : null,
    filterOptions: {
      display: (filterList, onChange, index, column) => (
        <FirebaseSelect
          label={label}
          getOptionLabel={getOptionLabel}
          getPath={getPath}
          value={filterList[index][0]}
          onChange={v => onChange(v ? [v] : [], index, column)}
        />
      )
    }
  };
}

export function firebaseMulti(label, getPath, getOptionLabel) {
  return {
    filterType: 'custom',
    customFilterListRender: items => {
      if (items && items.length) {
        const text = items.map(i => getOptionLabel(i)).join(', ');
        return `${label}: ${text}`;
      }

      return null;
    },
    filterOptions: {
      display: (filterList, onChange, index, column) => (
        <FirebaseSelect
          label={label}
          getPath={getPath}
          getOptionLabel={getOptionLabel}
          value={filterList[index]}
          isMulti
          onChange={v => onChange(v || [], index, column)}
        />
      )
    }
  };
}

export function textMulti(label, optionMap) {
  const options = Object.keys(optionMap).map(k => ({
    label: optionMap[k],
    value: k
  }));

  return {
    filterType: 'custom',
    customFilterListRender: items => {
      if (items && items.length) {
        const text = items.map(i => i.label).join(', ');
        return `${label}: ${text}`;
      }

      return null;
    },
    filterOptions: {
      display: (filterList, onChange, index, column) => (
        <Select
          options={options}
          label={label}
          TextFieldProps={{ label, variant: 'standard' }}
          value={filterList[index]}
          onChange={v => onChange(v || [], index, column)}
          isMulti
        />
      )
    }
  };
}
