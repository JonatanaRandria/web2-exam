// data.js
const generateData = () => {
    const years = [];
    const now = new Date();
    for (let year = 2019; year <= 2030; year++) {
      for (let month = 1; month <= 12; month++) {
        years.push(new Date(year, month - 1, 1));
      }
    }
    return years.map(date => ({
      date: date.toISOString().slice(0, 10),
      Agregat: Math.floor(Math.random() * 100),
      Tresorerie: Math.floor(Math.random() * -100),
      Immobilisations: Math.floor(Math.random() * 150),
      Obligations: Math.floor(Math.random() * 200),
      A2: Math.floor(Math.random() * 120),
      BP_Cresus_Cesar: Math.floor(Math.random() * -150),
      Byzance_1_3: Math.floor(Math.random() * 100),
      Creance_Cresus: Math.floor(Math.random() * 70),
      Dette_Cersus: Math.floor(Math.random() * 50),
      Myriade_Fr: Math.floor(Math.random() * 150),
      Patrimoine: Math.floor(Math.random() * 300),
    }));
  };
  
  export const data = generateData();
  