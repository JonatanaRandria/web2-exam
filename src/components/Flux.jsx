import React from 'react';

const Flux = ({ data }) => {

  const fluxImpossibles = data.fluxImpossibles;
  const fluxJournaliers = data.fluxJournaliers;

  return (
    <div>
        <p>Flux journaliers</p>
      <textarea
        value={fluxImpossibles}
        readOnly
        style={{ width: '100%', height: '150px', resize: 'none', marginBottom: '10px' }}
      />

      <p>Flux journaliers</p>
      <textarea
        value={fluxJournaliers}
        readOnly
        style={{ width: '100%', height: '250px', resize: 'none' }}
      />
    </div>
  );
};

export default Flux;
