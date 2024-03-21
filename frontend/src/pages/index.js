// src/pages/index.js
import React, { useState, useEffect } from 'react';
import { Button, Divider, Dropdown, Space, Card } from 'antd/lib';
import DownOutlined from '@ant-design/icons/DownOutlined';
import axios from 'axios';
import { simplifyNotionData } from '../utils/simplify-notion.utils';

function HomePage() {
  const [databases, setDatabases] = useState([]); // Holds timestamps
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [reportText, setReportText] = useState('');
  const [selectedFromLabel, setSelectedFromLabel] = useState('Select From');
  const [selectedToLabel, setSelectedToLabel] = useState('Select To');

  useEffect(() => {
    fetchDatabasesTimestamps();
  }, []);

  // Fetch timestamps of all saved databases
  async function fetchDatabasesTimestamps() {
    try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/databases/timestamps`);
    console.log("Fetched database timestamps successfully:", response.data);
    setDatabases(response.data);
  } catch (error) {
    console.error("Error fetching database timestamps:", error.response ? error.response.data : error.message);
    alert("Error fetching database timestamps. See console for more details.");
  }
  }

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
    const selectedDatabaseEntry = databases.find(db => db.id === id);

    if (type === 'From') {
      setSelectedFrom(id);
      setSelectedFromLabel(label); // Update the display label
    } else {
      setSelectedTo(id);
      setSelectedToLabel(label); // Update the display label
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
  async function generateReport() {
    if (!selectedFrom || !selectedTo) {
      alert('Please select both start and end timestamps.');
      return;
    }

    try {
      console.log("Generating report for timestamps:", selectedFrom, selectedTo);
      const [fromResponse, toResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/databases/by-id/${selectedFrom}`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/databases//by-id/${selectedTo}`)
      ]);

      console.log('Old Snapshot:', fromResponse.data);

      if (fromResponse.data.responseData && fromResponse.data.responseData.results && toResponse.data.responseData && toResponse.data.responseData.results) {
        const simplifiedOldSnapshot = fromResponse.data.responseData.results.map(page => simplifyNotionData(page));
        const simplifiedNewSnapshot = toResponse.data.responseData.results.map(page => simplifyNotionData(page));

        // Generate the report using GPT
        const reportResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gpt/analysis`, {
          oldSnapshot: simplifiedOldSnapshot,
          newSnapshot: simplifiedNewSnapshot
        });

        const report = reportResponse.data.report;
        setReportText(report);
        console.log("Generated report successfully:", report);
      } else {
        console.error("Missing responseData or results");
      }

    } catch (error) {
      console.error("Error generating report:", error.response ? error.response.data : error.message);
      alert("Error generating report. See console for more details.");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: '2.5rem' }}>Notion Soul Project Updates</h1>
      <Divider />
      <h2>Save Current Status</h2>
      <Button  onClick={saveCurrentDatabase}>Save</Button>
      <Divider />
      <h2>Get a Status Report</h2>
      {renderDropdown('From', selectedFromLabel)}
      <br />
      {renderDropdown('To', selectedToLabel)}
      <br />
      <Button onClick={generateReport} style={{ marginTop: 20 }}>Create Report</Button>
      {reportText && (
        <Card title="Report" style={{ marginTop: 20 }}>
          <p>{reportText}</p>
        </Card>
      )}
    </div>
  );
}

async function saveCurrentDatabase() {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/databases`);
    console.log("Database saved successfully:", response.data);
    alert("Database saved successfully!");
  } catch (error) {
    console.error("Error saving the database:", error.response ? error.response.data : error.message);
    alert("Error saving the database. See console for more details.");
  }
}

export default HomePage;
