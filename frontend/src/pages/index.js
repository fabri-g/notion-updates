// src/pages/index.js
import React, { useState } from 'react';
import { Button, Divider, Dropdown, Space, Card } from 'antd/lib';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { saveCurrentDatabase } from '../utils/save-current-database.utils';
import useFetchTimestamps from '../hooks/fetch-timestamps';
import { generateReport } from '../utils/generate-report.utils';

function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { loading, data: databases, error } = useFetchTimestamps(apiUrl);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [reportText, setReportText] = useState('');
  const [selectedFromLabel, setSelectedFromLabel] = useState('Select From');
  const [selectedToLabel, setSelectedToLabel] = useState('Select To');

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <Alert
      message="Error"
      description={`Failed to fetch data: ${error.message}`}
      type="error"
      showIcon
    />
  );
  // Preparing dropdown items
  const databaseMenuItems = (type) => databases.map((db) => ({
    key: db.id,
    label: (
      <a onClick={() => handleSelect(db.id, new Date(db.timestamp).toLocaleString(), type)}>
        {new Date(db.timestamp).toLocaleString()}
    </a>
    ),
  }));

  const handleSelect = (id, label, type) => {
    if (type === 'From') {
      setSelectedFrom(id);
      setSelectedFromLabel(label);
    } else {
      setSelectedTo(id);
      setSelectedToLabel(label);
    }
  };

  // Function to render the dropdown with the dynamic items
  const renderDropdown = (type, label) => (
    <Dropdown
    menu={{
      onClick: (info) => handleSelect(info.key, databases.find(db => db.id === info.key)?.timestamp, type),
      items: databaseMenuItems(type),
    }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {label} <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  );

  // Generate report based on selected timestamps
  const handleGenerateReport = async () => {
    const report = await generateReport(apiUrl, selectedFrom, selectedTo);
    setReportText(report);
  };

  const handleSaveDatabase = async () => {
    await saveCurrentDatabase(apiUrl);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: '2.5rem' }}>Notion Soul Project Updates</h1>
      <Divider />
      <h2>Save Current Status</h2>
      <Button  onClick={handleSaveDatabase}>Save</Button>
      <Divider />
      <h2>Get a Status Report</h2>
      {databases.length > 0 && (
        <>
          {renderDropdown('From', selectedFromLabel)}
          <br />
          {renderDropdown('To', selectedToLabel)}
          <br />
          <Button onClick={handleGenerateReport} style={{ marginTop: 20 }}>Create Report</Button>
          {reportText && (
            <Card title="Report" style={{ marginTop: 20 }}>
              <p>{reportText}</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
