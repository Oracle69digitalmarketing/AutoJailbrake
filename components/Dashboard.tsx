import React from 'react';
import type { Device } from '../types';
import ConnectView from './ConnectView';

interface DashboardProps {
  onSelectDevice: (device: Device) => void;
}

// This component is no longer used and is effectively replaced by ConnectView
const Dashboard: React.FC<DashboardProps> = ({ onSelectDevice }) => {
  return null;
};

export default Dashboard;
