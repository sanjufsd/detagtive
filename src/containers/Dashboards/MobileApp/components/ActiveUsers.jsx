/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

function getRandomArbitrary(minValue, maxValue) {
  const ratio = (maxValue - minValue) + minValue;
  return Math.random() * ratio;
}

function generateRandomData(dataLength, minDeviationValue, maxDeviationValue, minRange, maxRange) {
  const rangeFactor = (maxRange - minRange) / dataLength;

  return Array.from({ length: dataLength }, (v, k) => (
    {
      name: k,
      point: (k * rangeFactor) + getRandomArbitrary(minDeviationValue, maxDeviationValue),
      amt: 2000,
    }));
}

const data = generateRandomData(100, -2000, 2000, 300, 6000);

function tickFormer(tick) {
  return `${tick / 1000}k`;
}

const ActiveUsers = ({ t, dir }) => (
  <Panel
    lg={6}
    xl={9}
    md={12}
    title={t('dashboard_mobile_app.active_users')}
    subhead="See how users involve into app"
  >
    <div dir="ltr">
      <ResponsiveContainer height={190} className="dashboard__active-users-chart">
        <LineChart
          height={195}
          data={data}
        >
          <YAxis
            tickLine={false}
            tickFormatter={tickFormer}
            interval="preserveStartEnd"
            width={50}
            tick={{ transform: 'translate(-30, 0)', fontSize: 11 }}
            orientation={dir === 'rtl' ? 'right' : 'left'}
          />
          <XAxis
            hide
            padding={{ left: 30, right: 30 }}
            reversed={dir === 'rtl'}
          />
          <CartesianGrid vertical={false} />
          <Tooltip />
          <Line type="linear" dataKey="point" dot={false} stroke="#b8e986" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Panel>
);

ActiveUsers.propTypes = {
  t: PropTypes.func.isRequired,
  dir: PropTypes.string.isRequired,
};

export default withTranslation('common')(ActiveUsers);
