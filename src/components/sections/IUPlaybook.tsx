import React from 'react';

const IUPlaybook: React.FC = () => {
  return (
    <section className="iu-playbook">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-6">Hep’s IU Playbook</h2>
        <p className="text-lg text-center mb-4">
          Storytelling through sports metaphors to inspire and engage.
        </p>
        <div className="playbook-content">
          {/* Add sports metaphor visuals and animations here */}
          <p>Imagine your team on the field, strategizing for the next big play...</p>
        </div>
      </div>
    </section>
  );
};

export default IUPlaybook;
