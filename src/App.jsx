import React, { useState, useRef } from 'react';

// --- Icone SVG ---
const UserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileTextIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>);
const BookUserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/><path d="M15 13a3 3 0 1 0-6 0"/></svg>);
const StethoscopeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>);
const FolderUpIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3-3-3 3"/></svg>);
const GraduationCapIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>);
const ShieldAlertIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>);
const PlusCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>);
const PrinterIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>);
const CheckCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const XCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>);
const UploadCloudIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>);
const FileIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const SparklesIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>);
const LoaderIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>);

// --- Componenti UI riutilizzabili ---
const DashboardCard = ({ icon, title, description, onClick, disabled }) => (<div onClick={!disabled?onClick:null} className={`p-6 rounded-2xl transition-all duration-300 transform ${disabled?'bg-white/10 border border-white/20 cursor-not-allowed':'bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/30 hover:-translate-y-1 cursor-pointer'}`}> <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">{icon}</div><h3 className="text-xl font-bold text-white mb-2">{title}</h3><p className="text-gray-200 text-sm">{description}</p>{disabled && <div className="text-xs text-yellow-300 mt-3 font-semibold">Prossimamente</div>}</div>);
const FormInput = ({ label, name, value, onChange, placeholder, type = "text" }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"/></div>);
const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"/></div>);
const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (<button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${className}`} {...props}>{children}</button>);
const Modal = ({ show, onClose, children, size = 'lg' }) => {
    if (!show) return null;
    const sizeClasses = { lg: 'max-w-3xl', xl: 'max-w-5xl', '2xl': 'max-w-7xl' };
    return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}><div className={`w-full ${sizeClasses[size]} bg-gray-800/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>{children}</div></div>);
};

// --- Modulo Creazione Fascicolo Sanitario ---
const FascicoloSanitarioForm = ({ onBack, onAddAssistito }) => {
    const [patientData, setPatientData] = useState({
        nome: '', cognome: '', codiceFiscale: '', dataNascita: '', indirizzo: '', caregiverNome: '', caregiverTelefono: '', dataInizioCure: new Date().toISOString().split('T')[0], diagnosi: '', rischi: '', consensoInformato: false, barthel: '', dmi: '', adico: '', spmsq: '', pianoTrattamento: '', prestazioniErogate: '', ausili: '', verifichePeriodiche: '', risultatiRaggiunti: '', dataChiusura: '', motivazioneChiusura: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPatientData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientData.nome || !patientData.cognome || !patientData.codiceFiscale) {
            alert("Nome, Cognome e Codice Fiscale sono obbligatori.");
            return;
        }
        onAddAssistito(patientData);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Nuovo Fascicolo Sanitario</h2>
                <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna agli Assistiti</Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Sezioni del form come prima, ma con valori dallo stato `patientData` */}
                <section>
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Dati Anagrafici e Contatti</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Nome" name="nome" value={patientData.nome} onChange={handleChange} placeholder="Nome dell'assistito" />
                        <FormInput label="Cognome" name="cognome" value={patientData.cognome} onChange={handleChange} placeholder="Cognome dell'assistito" />
                        <FormInput label="Codice Fiscale" name="codiceFiscale" value={patientData.codiceFiscale} onChange={handleChange} placeholder="Codice Fiscale" />
                        {/* ... tutti gli altri campi del form ... */}
                        <FormInput label="Indirizzo" name="indirizzo" value={patientData.indirizzo} onChange={handleChange} placeholder="Indirizzo completo" />
                    </div>
                </section>
                {/* ... altre sezioni del form ... */}
                <div className="flex justify-end items-center pt-6 border-t border-white/20">
                    <Button onClick={onBack} className="bg-transparent text-gray-300 hover:bg-white/10 mr-4">Annulla</Button>
                    <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20">Crea Fascicolo e Assistito</Button>
                </div>
            </form>
        </div>
    );
};

// --- NUOVO: Modulo Assistiti ---
const Assistiti = ({ onNavigate, assistiti, setSelectedAssistito }) => {
    const handleSelect = (assistito) => {
        setSelectedAssistito(assistito);
        onNavigate('dettaglio-assistito');
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-white">Elenco Assistiti</h2>
                <div className="flex gap-4">
                    <Button onClick={() => onNavigate('nuovo-fascicolo')} className="bg-gradient-to-r from-cyan-500 to-blue-500"><PlusCircleIcon className="w-5 h-5"/> Aggiungi Nuovo Assistito</Button>
                    <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assistiti.length > 0 ? assistiti.map(a => (
                    <div key={a.id} onClick={() => handleSelect(a)} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-cyan-800/50 rounded-full flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-cyan-200"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{a.nome} {a.cognome}</h3>
                                <p className="text-sm text-gray-300">{a.indirizzo}</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-16 bg-black/20 rounded-2xl">
                        <h3 className="text-2xl font-semibold text-white">Nessun assistito presente</h3>
                        <p className="text-gray-400 mt-2">Clicca su "Aggiungi Nuovo Assistito" per iniziare.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- NUOVO: Vista Dettaglio Assistito ---
const PazienteDetail = ({ assistito, onBack, updateDiario }) => {
    const [activeTab, setActiveTab] = useState('fascicolo');

    if (!assistito) return <div className="text-white">Nessun assistito selezionato. <Button onClick={onBack}>Torna all'elenco</Button></div>;
    
    const TabButton = ({ tabName, label }) => (
        <button 
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === tabName ? 'bg-black/20 text-white border-b-2 border-cyan-400' : 'text-gray-400 hover:bg-white/5'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-4xl font-bold text-white">{assistito.nome} {assistito.cognome}</h2>
                    <p className="text-lg text-cyan-300">{assistito.codiceFiscale}</p>
                </div>
                <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna agli Assistiti</Button>
            </div>
            
            <div className="border-b border-white/20">
                <TabButton tabName="fascicolo" label="Fascicolo Sanitario"/>
                <TabButton tabName="diario" label="Diario Assistenziale"/>
            </div>

            <div className="bg-black/20 backdrop-blur-xl border border-white/20 border-t-0 rounded-b-2xl p-6">
                {activeTab === 'fascicolo' && <FascicoloSanitarioView assistito={assistito} />}
                {activeTab === 'diario' && <DiarioAssistenzialeView assistito={assistito} updateDiario={updateDiario} />}
            </div>
        </div>
    );
};

// --- Componenti di sola lettura per la vista dettaglio ---
const FascicoloSanitarioView = ({ assistito }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-4">Dettagli Fascicolo</h3>
        <div className="space-y-2 text-gray-200">
            <p><strong>Nome:</strong> {assistito.nome} {assistito.cognome}</p>
            <p><strong>Indirizzo:</strong> {assistito.indirizzo}</p>
            {/* Mostra qui tutti gli altri dati del fascicolo */}
        </div>
    </div>
);

const DiarioAssistenzialeView = ({ assistito, updateDiario }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false });

    const handleAddEntry = (e) => {
        e.preventDefault();
        if(newEntry.dateTime && newEntry.operator && newEntry.services) {
            updateDiario(assistito.id, newEntry);
            setIsModalOpen(false);
            setNewEntry({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false });
        } else {
            alert("Per favore, compila tutti i campi richiesti.");
        }
    };
    
    // ... (Il resto della UI del Diario Assistenziale, come prima, ma usando `assistito.diario`)
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Interventi</h3>
                <Button onClick={() => setIsModalOpen(true)} className="bg-white/10 hover:bg-white/20"><PlusCircleIcon className="w-5 h-5"/> Aggiungi Accesso</Button>
            </div>
             {/* Qui andrebbe la lista degli interventi del diario, mappando `assistito.diario` */}
             {assistito.diario && assistito.diario.length > 0 ? assistito.diario.map(entry => (
                 <div key={entry.id} className="bg-white/5 p-4 rounded-lg mb-3">
                     <p className="font-bold">{new Date(entry.dateTime).toLocaleString('it-IT')}</p>
                     <p>{entry.services}</p>
                     <p className="text-xs text-gray-400">Operatore: {entry.operator}</p>
                 </div>
             )) : <p className="text-gray-400 text-center p-6">Nessun intervento registrato nel diario.</p>}
        </div>
    );
};

// --- Moduli non modificati (Operatori, Documentazione, Formazione) ---
const Operatori = ({ onBack }) => { /* ... */ return (<div className="text-white p-4">Modulo Operatori. <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div>); };
const Documentazione = ({ onBack }) => { /* ... */ return (<div className="text-white p-4">Modulo Documentazione. <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div>); };
const Formazione = ({ onBack }) => { /* ... */ return (<div className="text-white p-4">Modulo Formazione. <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div>); };

// --- Componente Principale App ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [assistiti, setAssistiti] = useState([]);
    const [selectedAssistito, setSelectedAssistito] = useState(null);
    
    // Altri stati per gli altri moduli
    const [operators, setOperators] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [tests, setTests] = useState([]);

    const handleAddAssistito = (nuovoAssistito) => {
        const assistitoConId = { ...nuovoAssistito, id: Date.now(), diario: [] }; // Aggiunge un ID unico e un diario vuoto
        setAssistiti(prev => [...prev, assistitoConId]);
        setCurrentPage('assistiti'); // Torna all'elenco dopo l'aggiunta
    };

    const handleUpdateDiario = (assistitoId, nuovoIntervento) => {
        setAssistiti(prevAssistiti => 
            prevAssistiti.map(assistito => {
                if (assistito.id === assistitoId) {
                    const interventoConId = { ...nuovoIntervento, id: Date.now() };
                    const updatedDiario = assistito.diario ? [...assistito.diario, interventoConId] : [interventoConId];
                    return { ...assistito, diario: updatedDiario };
                }
                return assistito;
            })
        );
    };

    const handleNavigation = (page) => setCurrentPage(page);

    const renderPage = () => {
        switch (currentPage) {
            case 'assistiti': return <Assistiti onNavigate={handleNavigation} assistiti={assistiti} setSelectedAssistito={setSelectedAssistito} />;
            case 'nuovo-fascicolo': return <FascicoloSanitarioForm onBack={() => handleNavigation('assistiti')} onAddAssistito={handleAddAssistito} />;
            case 'dettaglio-assistito': return <PazienteDetail assistito={selectedAssistito} onBack={() => handleNavigation('assistiti')} updateDiario={handleUpdateDiario} />;
            
            // Altri moduli
            case 'operatori': return <Operatori onBack={() => handleNavigation('dashboard')} />;
            case 'documentazione': return <Documentazione onBack={() => handleNavigation('dashboard')} />;
            case 'formazione': return <Formazione onBack={() => handleNavigation('dashboard')} />;

            case 'dashboard':
            default:
                return <Dashboard onNavigate={handleNavigation} />;
        }
    };

    return (
        <main className="min-h-screen w-full bg-gray-900 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900 text-white font-sans flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {renderPage()}
        </main>
    );
}

// --- Dashboard Principale (Aggiornata) ---
const Dashboard = ({ onNavigate }) => {
    const modules = [
        { id: 'assistiti', title: 'Assistiti', description: 'Gestisci l\'anagrafica degli assistiti.', icon: <UserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'operatori', title: 'Operatori', description: 'Anagrafica e turni del personale.', icon: <StethoscopeIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'documentazione', title: 'Documentazione', description: 'Carica e consulta i documenti.', icon: <FolderUpIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'formazione', title: 'Formazione', description: 'Materiale formativo e corsi per operatori.', icon: <GraduationCapIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'rischio', title: 'Rischio Clinico', description: 'Gestione e monitoraggio del rischio clinico.', icon: <ShieldAlertIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
        // Ho rimosso i link diretti a Fascicolo e Diario, ora sono accessibili tramite un assistito.
    ];

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12"><h1 className="text-5xl font-bold text-white mb-4">Centrale Operativa Cure Domiciliari</h1><p className="text-xl text-gray-300">Pannello di controllo per la gestione integrata dell'assistenza.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{modules.map(module => (<DashboardCard key={module.id} title={module.title} description={module.description} icon={module.icon} disabled={module.disabled} onClick={() => onNavigate(module.id)}/>))}</div>
        </div>
    );
};
