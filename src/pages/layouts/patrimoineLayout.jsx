import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Typography, List, DatePicker, Select, Checkbox, Col, Row } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components for chart.js
Chart.register(...registerables);

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const App = () => {
  const [selectedProfile, setSelectedProfile] = useState('Cresus');
  const [dateRange, setDateRange] = useState([null, null]);
  const [showAgregat, setShowAgregat] = useState(true);
  const [showTresorerie, setShowTresorerie] = useState(true);
  const [showImmobilisations, setShowImmobilisations] = useState(true);
  const [showObligations, setShowObligations] = useState(true);
  const [fluxData, setFluxData] = useState([]);

  const handleProfileChange = (value) => {
    setSelectedProfile(value);
    updateFluxData(value, dateRange); // Update the flux data on profile change
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    updateFluxData(selectedProfile, dates); // Update the flux data on date change
  };

  const handleCheckboxChange = (checkedValues) => {
    setShowAgregat(checkedValues.includes('Agregat'));
    setShowTresorerie(checkedValues.includes('Tresorerie'));
    setShowImmobilisations(checkedValues.includes('Immobilisations'));
    setShowObligations(checkedValues.includes('Obligations'));
  };

  
  const updateFluxData = (profile, dateRange) => {

    const updatedData = [
      '!! FLUX IMPOSSIBLES !!',
      `[2024-07-14][BP ${profile} & Cesar=-8970€] (Néri, -5000) (Hita, -1000) (Raliz, -7000)`,
      '!! FLUX JOURNALIERS !!',
      `[2024-07-10][Myriade Fr=78840€] (CAR remb., 78000)`,
      `[2024-07-14][BP ${profile} & Cesar=-8970€] (Néri, -5000) (Hita, -1000) (Raliz, -7000)`,
    ];
    setFluxData(updatedData);
  };

  useEffect(() => {
    updateFluxData(selectedProfile, dateRange);
  }, [fluxData]);

  const data = {
    labels: ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '07-07', '07-08', '07-09', '07-10', '07-11', '07-12', '07-13', '07-14', '07-15', '07-16'],
    datasets: [
      showAgregat && {
        label: 'Agregat',
        data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 100, 90, 80, 70],
        borderColor: 'green',
        fill: false,
        borderWidth: 2,
      },
      showTresorerie && {
        label: 'Tresorerie',
        data: [0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100, -90, -80, -70, -60, -50],
        borderColor: 'red',
        fill: false,
        borderWidth: 2,
      },
      showImmobilisations && {
        label: 'Immobilisations',
        data: [0, 5, 15, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
        borderColor: 'blue',
        fill: false,
        borderWidth: 2,
      },
      showObligations && {
        label: 'Obligations',
        data: [0, 3, 12, 22, 30, 45, 50, 60, 75, 80, 90, 95, 105, 115, 125, 135],
        borderColor: 'yellow',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'A2',
        data: [0, 20, 30, 25, 35, 50, 60, 70, 90, 100, 110, 120, 130, 120, 110, 100],
        borderColor: 'brown',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'BP cresus&cesar',
        data: [0, -20, -15, -25, -30, -40, -50, -60, -70, -80, -90, -100, -110, -120, -130, -140],
        borderColor: 'brown',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Byzance 1/3',
        data: [0, 10, 15, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
        borderColor: 'brown',
        fill: false,
        borderDash: [5, 5],
        pointStyle: 'triangle',
        pointRadius: 5,
      },
      {
        label: 'créance crésus',
        data: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
        borderColor: 'brown',
        borderDash: [5, 5],
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Dette cersus',
        data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
        borderColor: 'lightbrown',
        borderDash: [5, 5],
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Myriade Fr',
        data: [0, 10, 20, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135],
        borderColor: 'lightbrown',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'patrimoine',
        data: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
        borderColor: 'green',
        fill: false,
        borderWidth: 4,
        pointStyle: 'rect',
        pointRadius: 6,
      },
    ].filter(Boolean),
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <Title style={{ color: 'white' }} level={2}>
          Patrimoine : possesseur={selectedProfile}
        </Title>
      </Header>
      <Layout>
        <Sider width={300} style={{ background: '#f0f2f5', height: '100vh', overflowY: 'auto' }}>
          <Select defaultValue={selectedProfile} style={{ width: '100%' }} onChange={handleProfileChange}>
            <Option value="Cresus">Cresus</Option>
            <Option value="Etudiant pire des cas">Etudiant pire des cas</Option>
            <Option value="Riches cas">Riches cas</Option>
          </Select>
          <RangePicker
            defaultValue={dateRange}
            onChange={handleDateChange}
            style={{ marginTop: '10px', width: '100%' }}
          />
          <Checkbox.Group
            style={{ marginTop: '20px' }}
            defaultValue={['Agregat', 'Tresorerie', 'Immobilisations', 'Obligations']}
            onChange={handleCheckboxChange}
          >
            <List
              bordered
              dataSource={[
                { label: 'Agregat', value: 'Agregat' },
                { label: 'Tresorerie', value: 'Tresorerie' },
                { label: 'Immobilisations', value: 'Immobilisations' },
                { label: 'Obligations', value: 'Obligations' },
              ]}
              renderItem={item => (
                <List.Item>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </Sider>
        <Content style={{ padding: '20px' }}>
          <Line data={data} options={{ responsive: true }} />
          <Title level={3}>Flux de données</Title>
          <List
            bordered
            dataSource={fluxData}
            renderItem={item => (
              <List.Item>{item}</List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
