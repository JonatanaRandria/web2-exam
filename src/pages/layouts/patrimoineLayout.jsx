import React, { useState, useEffect } from 'react';
import { Layout, Typography, List, DatePicker, Select, Checkbox } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { data } from '../../data/data';


Chart.register(...registerables);

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const App = () => {
  const [selectedProfile, setSelectedProfile] = useState('Agregat');
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
    const startDate = dateRange[0] ? dateRange[0].toISOString().slice(0, 10) : null;
    const endDate = dateRange[1] ? dateRange[1].toISOString().slice(0, 10) : null;

    const filteredData = data.filter(item => {
      return (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate);
    });

    const updatedFluxData = filteredData.map(item => (
      `Date: ${item.date}, ${profile} = ${item[profile]}`
    ));

    setFluxData(updatedFluxData);
  };

  useEffect(() => {
    updateFluxData(selectedProfile, dateRange);
  }, [selectedProfile, dateRange]);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    const startDate = dateRange[0] ? dateRange[0] : new Date(2019, 0, 1);
    const endDate = dateRange[1] ? dateRange[1] : new Date(2030, 11, 31);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const chartData = {
    labels: filteredData.map(item => item.date),
    datasets: [
      showAgregat && {
        label: 'Agregat',
        data: filteredData.map(item => item.Agregat),
        borderColor: 'green',
        fill: false,
        borderWidth: 2,
      },
      showTresorerie && {
        label: 'Tresorerie',
        data: filteredData.map(item => item.Tresorerie),
        borderColor: 'red',
        fill: false,
        borderWidth: 2,
      },
      showImmobilisations && {
        label: 'Immobilisations',
        data: filteredData.map(item => item.Immobilisations),
        borderColor: 'blue',
        fill: false,
        borderWidth: 2,
      },
      showObligations && {
        label: 'Obligations',
        data: filteredData.map(item => item.Obligations),
        borderColor: 'yellow',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'A2',
        data: filteredData.map(item => item.A2),
        borderColor: 'brown',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'BP cresus&cesar',
        data: filteredData.map(item => item.BP_Cresus_Cesar),
        borderColor: 'brown',
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Byzance 1/3',
        data: filteredData.map(item => item.Byzance_1_3),
        borderColor: 'brown',
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: 'Créance Crésus',
        data: filteredData.map(item => item.Creance_Cresus),
        borderColor: 'brown',
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: 'Dette Cersus',
        data: filteredData.map(item => item.Dette_Cersus),
        borderColor: 'lightbrown',
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: 'Myriade Fr',
        data: filteredData.map(item => item.Myriade_Fr),
        borderColor: 'lightbrown',
        fill: false,
      },
      {
        label: 'Patrimoine',
        data: filteredData.map(item => item.Patrimoine),
        borderColor: 'green',
        fill: false,
        borderWidth: 4,
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
            <Option value="Agregat">Agregat</Option>
            <Option value="Tresorerie">Tresorerie</Option>
            <Option value="Immobilisations">Immobilisations</Option>
            <Option value="Obligations">Obligations</Option>
          </Select>
          <RangePicker
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
          <Line data={chartData} options={{ responsive: true }} />
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
``
