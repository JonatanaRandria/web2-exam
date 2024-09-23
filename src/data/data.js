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

// Generate initial data
export const data = generateData();

// Function to get flux data
export const getFluxData = (filteredData) => {
    const fluxImpossibles = filteredData
        .filter(item => item.BP_Cresus_Cesar < 0) // Example condition for impossible flux
        .map(item => `[${item.date}],[BP Cresus & Cesar = ${item.BP_Cresus_Cesar}€],(Neri,${item.Obligations})(Hita,${item.Dette_Cersus})(Raliz,${item.A2})`)
        .join('\n');

    const fluxJournaliers = filteredData
        .map(item => `[${item.date}],[BP Cresus & Cesar = ${item.BP_Cresus_Cesar}€],(Neri,${item.Obligations})(Hita,${item.Dette_Cersus})(Raliz,${item.A2})`) // Example for daily flux
        .join('\n');

    return { fluxImpossibles, fluxJournaliers };
};
