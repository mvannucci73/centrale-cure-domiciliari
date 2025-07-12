import React, { useState, useRef, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// --- Configurazione Firebase ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

let app, db, auth, storage;
if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app); // Inizializzazione di Firebase Storage
}

// --- Icone SVG ---
const UserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileTextIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>);
const BookUserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/><path d="M15 13a3 3 0 1 0-6 0"/></svg>);
const StethoscopeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>);
const FolderUpIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3-3-3 3"/></svg>);
const GraduationCapIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>);
const ShieldAlertIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>);
const PlusCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>);
const XCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>);
const CheckCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const UploadCloudIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>);
const EditIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);

// --- Componenti UI riutilizzabili ---
const DashboardCard = ({ icon, title, description, onClick, disabled }) => (<div onClick={!disabled?onClick:null} className={`p-6 rounded-2xl transition-all duration-300 transform ${disabled?'bg-white/10 border border-white/20 cursor-not-allowed':'bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/30 hover:-translate-y-1 cursor-pointer'}`}> <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">{icon}</div><h3 className="text-xl font-bold text-white mb-2">{title}</h3><p className="text-gray-200 text-sm">{description}</p>{disabled && <div className="text-xs text-yellow-300 mt-3 font-semibold">Prossimamente</div>}</div>);
const FormInput = ({ label, name, value, onChange, placeholder, type = "text" }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"/></div>);
const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"/></div>);
const FormSelect = ({ label, name, value, onChange, children }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition">{children}</select></div>);
const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (<button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${className}`} {...props}>{children}</button>);
const Modal = ({ show, onClose, children, size = 'lg' }) => {
    if (!show) return null;
    const sizeClasses = { lg: 'max-w-xl', xl: 'max-w-5xl', '2xl': 'max-w-7xl' };
    return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}><div className={`w-full ${sizeClasses[size]} bg-gray-800/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>{children}</div></div>);
};


// --- Modulo Assistiti ---
const NuovoAssistitoModal = ({ show, onClose, onAddAssistito }) => {
    const [anagrafica, setAnagrafica] = useState({ nome: '', cognome: '', codiceFiscale: '', indirizzo: '' });
    const handleChange = (e) => { const { name, value } = e.target; setAnagrafica(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!anagrafica.nome || !anagrafica.cognome || !anagrafica.codiceFiscale) { alert("Nome, Cognome e Codice Fiscale sono obbligatori."); return; }
        onAddAssistito(anagrafica);
        setAnagrafica({ nome: '', cognome: '', codiceFiscale: '', indirizzo: '' });
        onClose();
    };
    return (
        <Modal show={show} onClose={onClose} size="lg">
            <div className="p-8"><h3 className="text-2xl font-bold text-white mb-6">Nuovo Assistito</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput label="Nome" name="nome" value={anagrafica.nome} onChange={handleChange} placeholder="Nome dell'assistito" />
                    <FormInput label="Cognome" name="cognome" value={anagrafica.cognome} onChange={handleChange} placeholder="Cognome dell'assistito" />
                    <FormInput label="Codice Fiscale" name="codiceFiscale" value={anagrafica.codiceFiscale} onChange={handleChange} placeholder="Codice Fiscale" />
                    <FormInput label="Indirizzo" name="indirizzo" value={anagrafica.indirizzo} onChange={handleChange} placeholder="Indirizzo completo" />
                    <div className="flex justify-end gap-4 pt-6"><Button onClick={onClose} className="bg-transparent text-gray-300 hover:bg-white/10">Annulla</Button><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">Aggiungi</Button></div>
                </form>
            </div>
        </Modal>
    );
};

const Assistiti = ({ onNavigate, assistiti, onAddAssistito }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <NuovoAssistitoModal show={isModalOpen} onClose={() => setIsModalOpen(false)} onAddAssistito={onAddAssistito} />
            <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-white">Elenco Assistiti</h2>
                    <div className="flex gap-4">
                        <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-cyan-500 to-blue-500"><PlusCircleIcon className="w-5 h-5"/> Aggiungi Assistito</Button>
                        <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assistiti.length > 0 ? assistiti.map(a => (
                        <div key={a.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-cyan-800/50 rounded-full flex items-center justify-center flex-shrink-0"><UserIcon className="w-6 h-6 text-cyan-200"/></div>
                                    <div><h3 className="text-lg font-bold text-white">{a.nome} {a.cognome}</h3><p className="text-sm text-gray-300">{a.indirizzo}</p></div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 border-t border-white/10 pt-3 mt-3 space-y-1">
                                <p>Fascicolo: <span className={a.fascicolo ? 'text-green-400 font-semibold' : 'text-yellow-400 font-semibold'}>{a.fascicolo ? 'Compilato' : 'Da Compilare'}</span></p>
                                <p>Diario: <span className="text-white font-semibold">{a.diario.length}</span> accessi registrati</p>
                            </div>
                        </div>
                    )) : (<div className="col-span-full text-center py-16 bg-black/20 rounded-2xl"><h3 className="text-2xl font-semibold text-white">Nessun assistito presente</h3><p className="text-gray-400 mt-2">Clicca su "Aggiungi Assistito" per creare una nuova anagrafica.</p></div>)}
                </div>
            </div>
        </>
    );
};


// --- Modulo Fascicolo Sanitario ---
const FascicoloSanitarioForm = ({ onBack, assistito, onUpdateFascicolo }) => {
    const [fascicoloData, setFascicoloData] = useState(assistito.fascicolo || { dataInizioCure: new Date().toISOString().split('T')[0], diagnosi: '', rischi: '', consensoInformato: false, barthel: '', dmi: '', adico: '', spmsq: '', pianoTrattamento: '', prestazioniErogate: '', ausili: '', verifichePeriodiche: '', risultatiRaggiunti: '', dataChiusura: '', motivazioneChiusura: '' });
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFascicoloData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
    const handleSubmit = (e) => { e.preventDefault(); onUpdateFascicolo(assistito.id, fascicoloData); };
    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div><h2 className="text-3xl font-bold text-white">Fascicolo Sanitario</h2><p className="text-lg text-cyan-300">{assistito.nome} {assistito.cognome}</p></div>
                <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna all'elenco</Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Dati Clinici e Assistenziali</h3><div className="grid md:grid-cols-2 gap-6"><FormInput label="Data Inizio Cure Domiciliari" name="dataInizioCure" value={fascicoloData.dataInizioCure} onChange={handleChange} type="date" /><div className="flex items-center space-x-4 pt-6"><input type="checkbox" id="consensoInformato" name="consensoInformato" checked={fascicoloData.consensoInformato} onChange={handleChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="consensoInformato" className="text-gray-200">Consenso Informato ricevuto</label></div><div className="md:col-span-2"><FormTextarea label="Diagnosi" name="diagnosi" value={fascicoloData.diagnosi} onChange={handleChange} placeholder="Descrivere la diagnosi principale" /></div><div className="md:col-span-2"><FormTextarea label="Elementi di Rischio Sanitario ed Assistenziale" name="rischi" value={fascicoloData.rischi} onChange={handleChange} placeholder="Es. allergie, rischio caduta, piaghe da decubito..." /></div></div></section>
                <section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Strumenti di Valutazione</h3><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"><FormInput label="Scala di Barthel" name="barthel" value={fascicoloData.barthel} onChange={handleChange} placeholder="Punteggio" /><FormInput label="D.M.I." name="dmi" value={fascicoloData.dmi} onChange={handleChange} placeholder="Punteggio" /><FormInput label="A.Di.Co" name="adico" value={fascicoloData.adico} onChange={handleChange} placeholder="Punteggio" /><FormInput label="S.P.M.S.Q." name="spmsq" value={fascicoloData.spmsq} onChange={handleChange} placeholder="Es. '3 errori'" /></div></section>
                <section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Piano Assistenziale Integrato (PAI)</h3><div className="space-y-6"><FormTextarea label="Piano di Trattamento" name="pianoTrattamento" value={fascicoloData.pianoTrattamento} onChange={handleChange} placeholder="Descrivere il piano di trattamento e gli obiettivi" /><FormTextarea label="Prestazioni Erogate (Diario)" name="prestazioniErogate" value={fascicoloData.prestazioniErogate} onChange={handleChange} placeholder="Aggiornare con le prestazioni erogate" /><FormTextarea label="Necessità di Ausili/Presidi" name="ausili" value={fascicoloData.ausili} onChange={handleChange} placeholder="Elencare ausili e presidi necessari" /><FormTextarea label="Verifiche Periodiche" name="verifichePeriodiche" value={fascicoloData.verifichePeriodiche} onChange={handleChange} placeholder="Annotare le verifiche e i controlli" /><FormTextarea label="Risultati Raggiunti" name="risultatiRaggiunti" value={fascicoloData.risultatiRaggiunti} onChange={handleChange} placeholder="Descrivere i risultati ottenuti" /></div></section>
                <section><h3 className="text-xl font-semibold text-orange-400 mb-4 border-b border-orange-400/30 pb-2">Chiusura Piano Assistenziale</h3><div className="grid md:grid-cols-2 gap-6"><FormInput label="Data Chiusura" name="dataChiusura" value={fascicoloData.dataChiusura} onChange={handleChange} type="date" /><div className="md:col-span-2"><FormTextarea label="Motivazione della Chiusura" name="motivazioneChiusura" value={fascicoloData.motivazioneChiusura} onChange={handleChange} placeholder="Descrivere il motivo della chiusura (es. termine programma, trasferimento, decesso)" /></div></div></section>
                <div className="flex justify-end items-center pt-6 border-t border-white/20"><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20">Salva Modifiche Fascicolo</Button></div>
            </form>
        </div>
    );
};

const FascicoloSanitarioHub = ({ onNavigate, assistiti, setSelectedAssistito }) => {
    const handleSelect = (assistito) => { setSelectedAssistito(assistito); onNavigate('fascicolo-form'); };
    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
            <div className="flex justify-between items-center mb-8"><h2 className="text-4xl font-bold text-white">Fascicolo Sanitario</h2><Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6"><h3 className="text-xl font-semibold text-white mb-4">Seleziona un assistito per compilare il fascicolo</h3>
                <div className="space-y-3">
                    {assistiti.length > 0 ? assistiti.map(a => (
                        <div key={a.id} onClick={() => handleSelect(a)} className="bg-white/5 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4"><UserIcon className="w-6 h-6 text-cyan-300"/><div><p className="font-bold text-white">{a.nome} {a.cognome}</p><p className="text-sm text-gray-400">{a.codiceFiscale}</p></div></div>
                            <Button className="text-sm !py-1 !px-3 bg-white/10 hover:bg-white/20">{a.fascicolo ? 'Modifica Fascicolo' : 'Compila Fascicolo'}</Button>
                        </div>
                    )) : (<div className="text-center py-10"><p className="text-gray-400">Nessun assistito trovato. Creane uno dal modulo "Assistiti".</p></div>)}
                </div>
            </div>
        </div>
    );
};

// --- Modulo Diario Assistenziale ---
const DiarioAssistenzialeView = ({ onBack, assistito, onUpdateDiario, operators }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false });
    const handleInputChange = (e) => { const { name, value, type, checked } = e.target; setNewEntry(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
    const handleAddEntry = (e) => {
        e.preventDefault();
        if(newEntry.dateTime && newEntry.operator && newEntry.services) { onUpdateDiario(assistito.id, newEntry); setIsModalOpen(false); setNewEntry({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false }); } 
        else { alert("Per favore, compila tutti i campi richiesti."); }
    };
    return (
        <>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h3 className="text-2xl font-bold text-white mb-6">Aggiungi Nuovo Accesso</h3>
                <form onSubmit={handleAddEntry} className="space-y-4">
                    <FormInput label="Data e Ora" name="dateTime" type="datetime-local" value={newEntry.dateTime} onChange={handleInputChange} />
                    <FormSelect label="Operatore/i" name="operator" value={newEntry.operator} onChange={handleInputChange}>
                        {operators.map(op => <option key={op.id} value={`${op.name} (${op.role})`}>{op.name} ({op.role})</option>)}
                    </FormSelect>
                    <FormTextarea label="Prestazioni Svolte" name="services" value={newEntry.services} onChange={handleInputChange} placeholder="Descrivere le attività..."/>
                    <div className="space-y-3 pt-4"><div className="flex items-center"><input id="operatorSigned" name="operatorSigned" type="checkbox" checked={newEntry.operatorSigned} onChange={handleInputChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="operatorSigned" className="ml-3 text-gray-300">Firma dell'operatore apposta</label></div><div className="flex items-center"><input id="patientSigned" name="patientSigned" type="checkbox" checked={newEntry.patientSigned} onChange={handleInputChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="patientSigned" className="ml-3 text-gray-300">Firma dell'assistito/caregiver apposta</label></div></div>
                    <div className="flex justify-end gap-4 pt-6"><Button onClick={() => setIsModalOpen(false)} className="bg-transparent text-gray-300 hover:bg-white/10">Annulla</Button><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">Aggiungi</Button></div>
                </form>
            </Modal>
            <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6"><div><h2 className="text-3xl font-bold text-white">Diario Assistenziale</h2><p className="text-lg text-cyan-300">{assistito.nome} {assistito.cognome}</p></div><Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna all'elenco</Button></div>
                <div className="flex justify-end mb-6"><Button onClick={() => setIsModalOpen(true)} className="bg-white/10 hover:bg-white/20"><PlusCircleIcon className="w-5 h-5"/> Aggiungi Accesso</Button></div>
                <div className="space-y-6">
                    {assistito.diario && assistito.diario.length > 0 ? [...assistito.diario].reverse().map(entry => (
                        <div key={entry.id} className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <div className="flex justify-between items-start mb-3"><div><p className="font-bold text-lg text-white">{new Date(entry.dateTime).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p><p className="text-sm text-gray-300">Ore: {new Date(entry.dateTime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p></div><p className="text-sm text-gray-300 font-medium bg-cyan-900/50 px-3 py-1 rounded-full">{entry.operator}</p></div>
                            <p className="text-gray-200 mb-4">{entry.services}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs border-t border-white/10 pt-3"><div className={`flex items-center gap-2 ${entry.operatorSigned ? 'text-green-400' : 'text-yellow-400'}`}><CheckCircleIcon className="w-4 h-4"/><span>Firma Operatore: {entry.operatorSigned ? 'Sì' : 'Non presente'}</span></div><div className={`flex items-center gap-2 ${entry.patientSigned ? 'text-green-400' : 'text-yellow-400'}`}><CheckCircleIcon className="w-4 h-4"/><span>Firma Assistito/Caregiver: {entry.patientSigned ? 'Sì' : 'Non presente'}</span></div></div>
                        </div>
                    )) : (<div className="text-center py-10 px-6 bg-white/5 rounded-xl"><h3 className="text-xl font-semibold text-white">Nessun accesso registrato</h3><p className="text-gray-400 mt-2">Clicca su "Aggiungi Accesso" per iniziare a registrare le attività.</p></div>)}
                </div>
            </div>
        </>
    );
};

const DiarioAssistenzialeHub = ({ onNavigate, assistiti, setSelectedAssistito }) => {
    const handleSelect = (assistito) => { setSelectedAssistito(assistito); onNavigate('diario-view'); };
    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
            <div className="flex justify-between items-center mb-8"><h2 className="text-4xl font-bold text-white">Diario Assistenziale</h2><Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6"><h3 className="text-xl font-semibold text-white mb-4">Seleziona un assistito per gestire il diario</h3>
                <div className="space-y-3">
                    {assistiti.length > 0 ? assistiti.map(a => (
                        <div key={a.id} onClick={() => handleSelect(a)} className="bg-white/5 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4"><UserIcon className="w-6 h-6 text-cyan-300"/><div><p className="font-bold text-white">{a.nome} {a.cognome}</p><p className="text-sm text-gray-400">{a.codiceFiscale}</p></div></div>
                            <Button className="text-sm !py-1 !px-3 bg-white/10 hover:bg-white/20">Gestisci Diario</Button>
                        </div>
                    )) : (<div className="text-center py-10"><p className="text-gray-400">Nessun assistito trovato. Creane uno dal modulo "Assistiti".</p></div>)}
                </div>
            </div>
        </div>
    );
};

// --- Modulo Operatori ---
const initialOperators = [
    { id: 1, name: 'Dott.ssa Cecilia Matta', role: 'Direttore' }, { id: 2, name: 'Lorenzo Grecu', role: 'Direttore e Medico Responsabile' }, { id: 3, name: 'Federica Pastorino', role: 'Vice-Direttore, RQ, Psicologa' }, { id: 4, name: 'Matteo Vannucci', role: 'Responsabile Formazione' }, { id: 5, name: 'Nadia Vuovolo', role: 'Segreteria - Call Center' }, { id: 6, name: 'Pasquale Milena', role: 'Coordinatore Infermieristico' }, { id: 7, name: 'Cristina Bovone', role: 'Case Manager' }, { id: 8, name: 'Andrea Corradini', role: 'Fisioterapista' }, { id: 9, name: 'Emanuele Pisoni', role: 'Fisioterapista' }, { id: 10, name: 'Ghita Dumitra', role: 'Infermiere' }, { id: 11, name: 'Sasu Roxana', role: 'Infermiere' }, { id: 12, name: 'Ferrarotti Lucia', role: 'OSS' }, { id: 13, name: 'Conzatti Anna', role: 'OSS' }, { id: 14, name: 'Tononi Sabrina', role: 'OSS' }, { id: 15, name: 'Romano Anna Tiziana', role: 'OSS' }, { id: 16, name: 'Marella Eugenia', role: 'OSS' },
];
const Operatori = ({ onBack, operators }) => { return (<div className="w-full max-w-6xl mx-auto p-6 md:p-8"><div className="flex justify-between items-center mb-8"><h2 className="text-4xl font-bold text-white">Elenco Operatori</h2><Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{operators.map(op => (<div key={op.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg"><h3 className="text-lg font-bold text-white">{op.name}</h3><p className="text-sm text-cyan-300">{op.role}</p></div>))}</div></div>); };


// --- Modulo Documentazione ---
const DocumentoModal = ({ show, onClose, onSave, documentoToEdit }) => {
    const [docData, setDocData] = useState({ title: '', version: '', type: 'Procedura', file: null });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (documentoToEdit) {
            setDocData({
                title: documentoToEdit.title,
                version: documentoToEdit.version,
                type: documentoToEdit.type,
                file: null // Il file va riselezionato per la modifica
            });
        } else {
            setDocData({ title: '', version: '', type: 'Procedura', file: null });
        }
    }, [documentoToEdit, show]);

    const handleFileChange = (e) => { setDocData(prev => ({ ...prev, file: e.target.files[0] })); };
    const handleChange = (e) => { const { name, value } = e.target; setDocData(prev => ({ ...prev, [name]: value })); };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!docData.title || (!docData.file && !documentoToEdit)) {
            alert("Titolo e file sono obbligatori.");
            return;
        }
        setIsUploading(true);
        try {
            await onSave(docData, documentoToEdit?.id, documentoToEdit?.storagePath);
            onClose();
        } catch (error) {
            console.error("Errore nel salvataggio del documento:", error);
            alert("Si è verificato un errore durante il salvataggio.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} size="lg">
            <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{documentoToEdit ? 'Modifica Documento' : 'Carica Nuovo Documento'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput label="Titolo Documento" name="title" value={docData.title} onChange={handleChange} placeholder="Es. Procedura Igiene Mani" />
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Versione" name="version" value={docData.version} onChange={handleChange} placeholder="Es. 1.0" />
                        <FormSelect label="Tipo" name="type" value={docData.type} onChange={handleChange}><option>Procedura</option><option>Linea Guida</option></FormSelect>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">{documentoToEdit ? 'Sostituisci File PDF (opzionale)' : 'File PDF'}</label>
                        <input type="file" name="file" onChange={handleFileChange} accept="application/pdf" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-200 hover:file:bg-cyan-500/30"/>
                        {docData.file && <p className="text-xs text-cyan-300 mt-1">Selezionato: {docData.file.name}</p>}
                    </div>
                    <div className="flex justify-end gap-4 pt-6">
                        <Button onClick={onClose} className="bg-transparent text-gray-300 hover:bg-white/10" disabled={isUploading}>Annulla</Button>
                        <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400" disabled={isUploading}>
                            {isUploading ? 'Salvataggio...' : 'Salva su Cloud'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

const Documentazione = ({ onNavigate, documents, onAddOrUpdateDocumento }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documentoToEdit, setDocumentoToEdit] = useState(null);

    const handleOpenModal = (doc = null) => {
        setDocumentoToEdit(doc);
        setIsModalOpen(true);
    };

    return (
        <>
            <DocumentoModal show={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={onAddOrUpdateDocumento} documentoToEdit={documentoToEdit} />
            <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
                <div className="flex justify-between items-center mb-8"><h2 className="text-4xl font-bold text-white">Documentazione</h2><div className="flex gap-4"><Button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-cyan-500 to-blue-500"><UploadCloudIcon className="w-5 h-5"/> Carica Documento</Button><Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div></div>
                <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
                    {documents.length > 0 ? documents.map(doc => (
                        <div key={doc.id} className="bg-white/5 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0"><FileTextIcon className="w-6 h-6 text-gray-300"/></div><div><h3 className="text-lg font-bold text-white">{doc.title}</h3><p className="text-sm text-gray-400">Versione: {doc.version} - Tipo: {doc.type}</p></div></div>
                            <div className="flex gap-2">
                                <Button onClick={() => window.open(doc.url, '_blank')} className="bg-white/10 hover:bg-white/20 text-sm" disabled={!doc.url}>Visualizza</Button>
                                <Button onClick={() => handleOpenModal(doc)} className="bg-white/10 hover:bg-white/20 text-sm"><EditIcon className="w-4 h-4"/> Modifica</Button>
                            </div>
                        </div>
                    )) : (<div className="text-center py-16"><h3 className="text-2xl font-semibold text-white">Nessun documento caricato</h3><p className="text-gray-400 mt-2">Clicca su "Carica Documento" per iniziare.</p></div>)}
                </div>
            </div>
        </>
    );
};

// --- Altri Moduli (placeholder) ---
const Formazione = ({ onBack }) => { return (<div className="text-white p-4">Modulo Formazione. <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button></div>); };

// --- Componente Principale App ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [assistiti, setAssistiti] = useState([]);
    const [operators, setOperators] = useState(initialOperators);
    const [documents, setDocuments] = useState([]);
    const [selectedAssistito, setSelectedAssistito] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState(null);

    // Effetto per l'autenticazione e il setup dei listener
    useEffect(() => {
        if (!auth) return;
    
        const performInitialSignIn = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Initial sign-in failed:", error);
            }
        };
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setIsAuthReady(true);
            } else {
                performInitialSignIn();
            }
        });
    
        return () => unsubscribe();
    }, []);
    

    // Effetto per sincronizzare i documenti con Firestore
    useEffect(() => {
        if (!isAuthReady || !db) return;
        
        const documentsCollection = collection(db, 'artifacts', appId, 'public', 'data', 'documents');
        const unsubscribeDocs = onSnapshot(documentsCollection, (snapshot) => {
            const docsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDocuments(docsList);
        }, (error) => {
            console.error("Firestore Snapshot Error:", error);
        });

        return () => unsubscribeDocs();
    }, [isAuthReady, appId]);

    const handleAddAssistito = (anagrafica) => {
        const nuovoAssistito = { id: Date.now(), ...anagrafica, fascicolo: null, diario: [] };
        setAssistiti(prev => [...prev, nuovoAssistito]);
    };

    const handleUpdateFascicolo = (assistitoId, fascicoloData) => {
        setAssistiti(prev => prev.map(a => a.id === assistitoId ? { ...a, fascicolo: fascicoloData } : a));
        alert("Fascicolo salvato con successo!");
        setCurrentPage('fascicolo-hub');
    };

    const handleUpdateDiario = (assistitoId, nuovoIntervento) => {
        let updatedPatient = null;
        setAssistiti(prev => prev.map(a => {
            if (a.id === assistitoId) {
                const interventoConId = { ...nuovoIntervento, id: Date.now() };
                const updatedDiario = a.diario ? [...a.diario, interventoConId] : [interventoConId];
                updatedPatient = { ...a, diario: updatedDiario };
                return updatedPatient;
            }
            return a;
        }));
        if (updatedPatient) {
            setSelectedAssistito(updatedPatient);
        }
    };
    
    const handleAddOrUpdateDocumento = async (docData, docIdToUpdate, oldStoragePath) => {
        if (!db || !isAuthReady || !storage) {
            alert("Database o Storage non pronti. Impossibile salvare.");
            return;
        }

        let downloadURL = null;
        let storagePath = oldStoragePath;

        // 1. Se è stato fornito un nuovo file, caricalo su Storage
        if (docData.file) {
            // Se stiamo modificando, potremmo voler cancellare il vecchio file.
            // Per semplicità, in questo MVP, non lo cancelliamo, ma in un'app di produzione sarebbe necessario.
            storagePath = `documents/${Date.now()}_${docData.file.name}`;
            const storageRef = ref(storage, storagePath);
            await uploadBytes(storageRef, docData.file);
            downloadURL = await getDownloadURL(storageRef);
        }

        // 2. Prepara i dati da salvare/aggiornare su Firestore
        const dataToSave = {
            title: docData.title,
            version: docData.version,
            type: docData.type,
            uploadDate: new Date().toISOString(),
        };

        if (downloadURL) { // Aggiungi URL e path solo se è stato caricato un nuovo file
            dataToSave.url = downloadURL;
            dataToSave.storagePath = storagePath;
        }

        // 3. Salva o aggiorna il documento su Firestore
        try {
            if (docIdToUpdate) { // Aggiorna documento esistente
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'documents', docIdToUpdate);
                await updateDoc(docRef, dataToSave);
                alert("Documento modificato con successo!");
            } else { // Crea nuovo documento
                await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'documents'), dataToSave);
                alert("Documento caricato e salvato con successo!");
            }
        } catch (error) {
            console.error("Errore nel salvataggio del documento: ", error);
            alert("Si è verificato un errore durante il salvataggio.");
            throw error; // Rilancia l'errore per gestirlo nella UI
        }
    };

    const handleNavigation = (page) => setCurrentPage(page);

    const renderPage = () => {
        switch (currentPage) {
            case 'assistiti': return <Assistiti onNavigate={handleNavigation} assistiti={assistiti} onAddAssistito={handleAddAssistito} />;
            case 'fascicolo-hub': return <FascicoloSanitarioHub onNavigate={handleNavigation} assistiti={assistiti} setSelectedAssistito={setSelectedAssistito} />;
            case 'fascicolo-form': return <FascicoloSanitarioForm onBack={() => handleNavigation('fascicolo-hub')} assistito={selectedAssistito} onUpdateFascicolo={handleUpdateFascicolo} />;
            case 'diario-hub': return <DiarioAssistenzialeHub onNavigate={handleNavigation} assistiti={assistiti} setSelectedAssistito={setSelectedAssistito} />;
            case 'diario-view': return <DiarioAssistenzialeView onBack={() => handleNavigation('diario-hub')} assistito={selectedAssistito} onUpdateDiario={handleUpdateDiario} operators={operators} />;
            case 'operatori': return <Operatori onBack={() => handleNavigation('dashboard')} operators={operators} />;
            case 'documentazione': return <Documentazione onNavigate={handleNavigation} documents={documents} onAddOrUpdateDocumento={handleAddOrUpdateDocumento} />;
            case 'formazione': return <Formazione onBack={() => handleNavigation('dashboard')} />;
            case 'dashboard':
            default:
                return <Dashboard onNavigate={handleNavigation} />;
        }
    };

    return (<main className="min-h-screen w-full bg-gray-900 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900 text-white font-sans flex items-center justify-center p-4 sm:p-6 lg:p-8">{renderPage()}</main>);
}

// --- Dashboard Principale ---
const Dashboard = ({ onNavigate }) => {
    const modules = [
        { id: 'assistiti', title: 'Assistiti', description: 'Crea e gestisci l\'anagrafica degli assistiti.', icon: <UserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'fascicolo-hub', title: 'Fascicolo Sanitario', description: 'Compila i dati clinici degli assistiti.', icon: <FileTextIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'diario-hub', title: 'Diario Assistenziale', description: 'Registra gli accessi e le attività giornaliere.', icon: <BookUserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'operatori', title: 'Operatori', description: 'Anagrafica e turni del personale.', icon: <StethoscopeIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'documentazione', title: 'Documentazione', description: 'Carica e consulta i documenti.', icon: <FolderUpIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'formazione', title: 'Formazione', description: 'Materiale formativo e corsi per operatori.', icon: <GraduationCapIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
        { id: 'rischio', title: 'Rischio Clinico', description: 'Gestione e monitoraggio del rischio clinico.', icon: <ShieldAlertIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
    ];
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12"><h1 className="text-5xl font-bold text-white mb-4">Centrale Operativa Cure Domiciliari</h1><p className="text-xl text-gray-300">Pannello di controllo per la gestione integrata dell'assistenza.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{modules.map(module => (<DashboardCard key={module.id} title={module.title} description={module.description} icon={module.icon} disabled={module.disabled} onClick={() => onNavigate(module.id)}/>))}</div>
        </div>
    );
};
