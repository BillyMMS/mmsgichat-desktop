import {
  ToggleSwitch,
  Field,
  FieldRow,
  FieldLabel,
  FieldHint,
} from '@rocket.chat/fuselage';
import type { ChangeEvent, Dispatch, FC } from 'react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import type { RootAction } from '../../../../store/actions';
import type { RootState } from '../../../../store/rootReducer';
import { SETTINGS_SET_REPORT_OPT_IN_CHANGED } from '../../../actions';

type Props = {
  className?: string;
};

export const ReportErrors: FC<Props> = (props) => {
  const isReportEnabled = useSelector(
    ({ isReportEnabled }: RootState) => isReportEnabled
  );
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const { t } = useTranslation();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.currentTarget.checked;
      dispatch({
        type: SETTINGS_SET_REPORT_OPT_IN_CHANGED,
        payload: isChecked,
      });
    },
    [dispatch]
  );

  return (
    <Field className={props.className}>
      <FieldRow>
        <ToggleSwitch
          disabled={process.mas}
          onChange={handleChange}
          checked={isReportEnabled}
        />
        <FieldLabel htmlFor='toggle-switch'>
          {t('settings.options.report.title')}
        </FieldLabel>
      </FieldRow>
      <FieldRow>
        {process.mas ? (
          <FieldHint>{t('settings.options.report.masDescription')}</FieldHint>
        ) : (
          <FieldHint>{t('settings.options.report.description')}</FieldHint>
        )}
      </FieldRow>
    </Field>
  );
};
