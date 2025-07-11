

import React, { useState, useRef } from 'react';
// Le librerie jsPDF e html2canvas vengono caricate globalmente tramite tag <script>
// nel file HTML principale del tuo progetto (es. index.html o simile in Replit).
// NON devono essere importate qui, altrimenti causano un errore di compilazione.
// Esempio di tag da includere nel tuo HTML:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>


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


// --- Componenti UI riutilizzabili ---
const DashboardCard = ({ icon, title, description, onClick, disabled }) => (<div onClick={!disabled?onClick:null} className={`p-6 rounded-2xl transition-all duration-300 transform ${disabled?'bg-white/10 border border-white/20 cursor-not-allowed':'bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/30 hover:-translate-y-1 cursor-pointer'}`}> <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">{icon}</div><h3 className="text-xl font-bold text-white mb-2">{title}</h3><p className="text-gray-200 text-sm">{description}</p>{disabled && <div className="text-xs text-yellow-300 mt-3 font-semibold">Prossimamente</div>}</div>);
const FormInput = ({ label, name, value, onChange, placeholder, type = "text" }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"/></div>);
const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">{label}</label><textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"/></div>);
const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (<button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${className}`} {...props}>{children}</button>);
const Modal = ({ show, onClose, children, size = 'lg' }) => {
    if (!show) return null;
    const sizeClasses = {
        lg: 'max-w-3xl',
        xl: 'max-w-5xl',
        '2xl': 'max-w-7xl'
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className={`w-full ${sizeClasses[size]} bg-gray-800/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};


// --- Modulo Fascicolo Sanitario Domiciliare (Invariato) ---
const FascicoloSanitario = ({ onBack }) => {
    const [patientData, setPatientData] = useState({nome: 'Mario', cognome: 'Rossi', codiceFiscale: 'RSSMRA80A01H501U', dataNascita: '1980-01-01', indirizzo: 'Via Roma 1, 10121 Torino TO', caregiverNome: 'Anna Bianchi', caregiverTelefono: '3331234567', dataInizioCure: new Date().toISOString().split('T')[0], diagnosi: 'Post-operatorio anca', rischi: 'Allergia a penicillina, rischio cadute elevato', consensoInformato: true, barthel: '60', dmi: '2', adico: '1', spmsq: '3 errori', pianoTrattamento: 'Fisioterapia motoria 3 volte/settimana. Controllo parametri vitali giornaliero.', prestazioniErogate: 'Eseguita fisioterapia, misurata pressione.', ausili: 'Deambulatore, sedia a rotelle per esterni.', verifichePeriodiche: 'Controllo settimanale del medico di base.', risultatiRaggiunti: 'Miglioramento della mobilità articolare del 15%.', dataChiusura: '', motivazioneChiusura: ''});
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setPatientData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
    const handleSubmit = (e) => { e.preventDefault(); console.log("Dati salvati:", patientData); alert("Dati del fascicolo salvati con successo! (Controlla la console per i dettagli)"); };
    return (<div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"><div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-white">Fascicolo Sanitario Domiciliare</h2><Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna alla Dashboard</Button></div><form onSubmit={handleSubmit} className="space-y-8"><section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Dati Anagrafici e Contatti</h3><div className="grid md:grid-cols-2 gap-6"><FormInput label="Nome" name="nome" value={patientData.nome} onChange={handleChange} placeholder="Nome dell'assistito" /><FormInput label="Cognome" name="cognome" value={patientData.cognome} onChange={handleChange} placeholder="Cognome dell'assistito" /><FormInput label="Codice Fiscale" name="codiceFiscale" value={patientData.codiceFiscale} onChange={handleChange} placeholder="Codice Fiscale" /><FormInput label="Data di Nascita" name="dataNascita" value={patientData.dataNascita} onChange={handleChange} type="date" /><div className="md:col-span-2"><FormInput label="Indirizzo (per geolocalizzazione)" name="indirizzo" value={patientData.indirizzo} onChange={handleChange} placeholder="Es. Via Garibaldi 10, Milano" /></div><FormInput label="Caregiver di riferimento" name="caregiverNome" value={patientData.caregiverNome} onChange={handleChange} placeholder="Nome del caregiver" /><FormInput label="Telefono Caregiver" name="caregiverTelefono" value={patientData.caregiverTelefono} onChange={handleChange} placeholder="Numero di telefono" /></div></section><section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Dati Clinici e Assistenziali</h3><div className="grid md:grid-cols-2 gap-6"><FormInput label="Data Inizio Cure Domiciliari" name="dataInizioCure" value={patientData.dataInizioCure} onChange={handleChange} type="date" /><div className="flex items-center space-x-4 pt-6"><input type="checkbox" id="consensoInformato" name="consensoInformato" checked={patientData.consensoInformato} onChange={handleChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="consensoInformato" className="text-gray-200">Consenso Informato ricevuto</label></div><div className="md:col-span-2"><FormTextarea label="Diagnosi" name="diagnosi" value={patientData.diagnosi} onChange={handleChange} placeholder="Descrivere la diagnosi principale" /></div><div className="md:col-span-2"><FormTextarea label="Elementi di Rischio Sanitario ed Assistenziale" name="rischi" value={patientData.rischi} onChange={handleChange} placeholder="Es. allergie, rischio caduta, piaghe da decubito..." /></div></div></section><section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Strumenti di Valutazione</h3><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"><FormInput label="Scala di Barthel" name="barthel" value={patientData.barthel} onChange={handleChange} placeholder="Punteggio" /><FormInput label="D.M.I." name="dmi" value={patientData.dmi} onChange={handleChange} placeholder="Punteggio" /><FormInput label="A.Di.Co" name="adico" value={patientData.adico} onChange={handleChange} placeholder="Punteggio" /><FormInput label="S.P.M.S.Q." name="spmsq" value={patientData.spmsq} onChange={handleChange} placeholder="Es. '3 errori'" /></div></section><section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Piano Assistenziale Integrato (PAI)</h3><div className="space-y-6"><FormTextarea label="Piano di Trattamento" name="pianoTrattamento" value={patientData.pianoTrattamento} onChange={handleChange} placeholder="Descrivere il piano di trattamento e gli obiettivi" /><FormTextarea label="Prestazioni Erogate (Diario)" name="prestazioniErogate" value={patientData.prestazioniErogate} onChange={handleChange} placeholder="Aggiornare con le prestazioni erogate" /><FormTextarea label="Necessità di Ausili/Presidi" name="ausili" value={patientData.ausili} onChange={handleChange} placeholder="Elencare ausili e presidi necessari" /><FormTextarea label="Verifiche Periodiche" name="verifichePeriodiche" value={patientData.verifichePeriodiche} onChange={handleChange} placeholder="Annotare le verifiche e i controlli" /><FormTextarea label="Risultati Raggiunti" name="risultatiRaggiunti" value={patientData.risultatiRaggiunti} onChange={handleChange} placeholder="Descrivere i risultati ottenuti" /></div></section><section><h3 className="text-xl font-semibold text-orange-400 mb-4 border-b border-orange-400/30 pb-2">Chiusura Piano Assistenziale</h3><div className="grid md:grid-cols-2 gap-6"><FormInput label="Data Chiusura" name="dataChiusura" value={patientData.dataChiusura} onChange={handleChange} type="date" /><div className="md:col-span-2"><FormTextarea label="Motivazione della Chiusura" name="motivazioneChiusura" value={patientData.motivazioneChiusura} onChange={handleChange} placeholder="Descrivere il motivo della chiusura (es. termine programma, trasferimento, decesso)" /></div></div></section><div className="flex justify-end items-center pt-6 border-t border-white/20"><Button onClick={onBack} className="bg-transparent text-gray-300 hover:bg-white/10 mr-4">Annulla</Button><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20">Salva Modifiche</Button></div></form></div>);
};


// --- Modulo Diario Assistenziale (Invariato) ---
const DiarioAssistenziale = ({ onBack, patientName = "Mario Rossi" }) => {
    const [entries, setEntries] = useState([{ id: 1, dateTime: '2024-07-10T09:00', operator: 'Laura Verdi (OSS)', services: 'Igiene personale, mobilizzazione, controllo parametri vitali (PA 130/80).', operatorSigned: true, patientSigned: true },{ id: 2, dateTime: '2024-07-09T15:30', operator: 'Marco Neri (Fisioterapista)', services: 'Esercizi di riabilitazione motoria per arto inferiore.', operatorSigned: true, patientSigned: false },]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false });
    const printRef = useRef();
    const handleSavePdf = async () => { const { jsPDF } = window.jspdf; const html2canvas = window.html2canvas; if (!jsPDF || !html2canvas) { alert("Le librerie per la generazione del PDF non sono state caricate. Assicurati che i tag <script> siano presenti nel tuo file HTML."); return; } const element = printRef.current; const canvas = await html2canvas(element, { backgroundColor: '#111827' }); const data = canvas.toDataURL('image/png'); const pdf = new jsPDF('p', 'mm', 'a4'); const imgProperties = pdf.getImageProperties(data); const pdfWidth = pdf.internal.pageSize.getWidth(); const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width; pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight); pdf.save(`Diario_Assistenziale_${patientName.replace(' ', '_')}.pdf`); };
    const handleInputChange = (e) => { const { name, value, type, checked } = e.target; setNewEntry(prev => ({...prev, [name]: type === 'checkbox' ? checked : value})); };
    const handleAddEntry = (e) => { e.preventDefault(); if(newEntry.dateTime && newEntry.operator && newEntry.services) { setEntries(prev => [{id: Date.now(), ...newEntry}, ...prev]); setIsModalOpen(false); setNewEntry({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false }); } else { alert("Per favore, compila tutti i campi richiesti."); } };
    return (<><Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold text-white mb-6">Aggiungi Nuovo Accesso</h3><form onSubmit={handleAddEntry} className="space-y-4"><FormInput label="Data e Ora" name="dateTime" type="datetime-local" value={newEntry.dateTime} onChange={handleInputChange} /><FormInput label="Operatore/i" name="operator" value={newEntry.operator} onChange={handleInputChange} placeholder="Nome e qualifica (es. Mario Rossi, OSS)"/><FormTextarea label="Prestazioni Svolte" name="services" value={newEntry.services} onChange={handleInputChange} placeholder="Descrivere le attività..."/><div className="space-y-3 pt-4"><div className="flex items-center"><input id="operatorSigned" name="operatorSigned" type="checkbox" checked={newEntry.operatorSigned} onChange={handleInputChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="operatorSigned" className="ml-3 text-gray-300">Firma dell'operatore apposta</label></div><div className="flex items-center"><input id="patientSigned" name="patientSigned" type="checkbox" checked={newEntry.patientSigned} onChange={handleInputChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="patientSigned" className="ml-3 text-gray-300">Firma dell'assistito/caregiver apposta</label></div></div><div className="flex justify-end gap-4 pt-6"><Button onClick={() => setIsModalOpen(false)} className="bg-transparent text-gray-300 hover:bg-white/10">Annulla</Button><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">Aggiungi</Button></div></form></Modal><div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"><div ref={printRef} className="p-2"><div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6"><div><h2 className="text-3xl font-bold text-white">Diario Assistenziale</h2><p className="text-lg text-cyan-300">Assistito: {patientName}</p></div><div className="flex gap-4 mt-4 sm:mt-0"><Button onClick={() => setIsModalOpen(true)} className="bg-white/10 hover:bg-white/20"><PlusCircleIcon className="w-5 h-5"/> Aggiungi Accesso</Button><Button onClick={handleSavePdf} className="bg-white/10 hover:bg-white/20"><PrinterIcon className="w-5 h-5"/> Salva PDF</Button></div></div><div className="space-y-6">{entries.length > 0 ? entries.map(entry => (<div key={entry.id} className="bg-white/5 p-5 rounded-xl border border-white/10"><div className="flex justify-between items-start mb-3"><div><p className="font-bold text-lg text-white">{new Date(entry.dateTime).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p><p className="text-sm text-gray-300">Ore: {new Date(entry.dateTime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p></div><p className="text-sm text-gray-300 font-medium bg-cyan-900/50 px-3 py-1 rounded-full">{entry.operator}</p></div><p className="text-gray-200 mb-4">{entry.services}</p><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs border-t border-white/10 pt-3"><div className={`flex items-center gap-2 ${entry.operatorSigned ? 'text-green-400' : 'text-yellow-400'}`}><CheckCircleIcon className="w-4 h-4"/><span>Firma Operatore: {entry.operatorSigned ? 'Sì' : 'Non presente'}</span></div><div className={`flex items-center gap-2 ${entry.patientSigned ? 'text-green-400' : 'text-yellow-400'}`}><CheckCircleIcon className="w-4 h-4"/><span>Firma Assistito/Caregiver: {entry.patientSigned ? 'Sì' : 'Non presente'}</span></div></div></div>)) : (<div className="text-center py-10 px-6 bg-white/5 rounded-xl"><h3 className="text-xl font-semibold text-white">Nessun accesso registrato</h3><p className="text-gray-400 mt-2">Clicca su "Aggiungi Accesso" per iniziare a registrare le attività.</p></div>)}</div></div><div className="flex justify-start mt-8"><Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna alla Dashboard</Button></div></div></>);
};


// --- NUOVO: Modulo Operatori ---

// Dati aggiornati dall'organigramma
const initialOperators = [
    { id: 1, name: 'Dott.ssa Cecilia Matta', role: 'Direttore', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=CM', documents: { cv: { name: 'CV_Matta.pdf', date: '2023-01-10' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-01-15' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: null, procedure: { name: 'Form_Procedure.pdf', date: '2023-02-01' }, patente: { name: 'Patente_B.pdf', date: '2010-05-10' }, formazioneContinua: { name: 'ECM_2024.pdf', date: '2024-06-30' } } },
    { id: 2, name: 'Lorenzo Grecu', role: 'Direttore e Medico Responsabile', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=LG', documents: { cv: { name: 'CV_Grecu.pdf', date: '2022-10-01' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-01-15' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-03-10' }, procedure: { name: 'Form_Procedure.pdf', date: '2023-02-01' }, patente: { name: 'Patente_B.pdf', date: '2005-08-20' }, formazioneContinua: { name: 'ECM_2024.pdf', date: '2024-06-30' } } },
    { id: 3, name: 'Federica Pastorino', role: 'Vice-Direttore, RQ, Psicologa', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=FP', documents: { cv: { name: 'CV_Pastorino.pdf', date: '2023-03-15' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-02-20' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: null, procedure: { name: 'Form_Procedure.pdf', date: '2023-03-20' }, patente: { name: 'Patente_B.pdf', date: '2012-11-15' }, formazioneContinua: { name: 'ECM_Psico_2024.pdf', date: '2024-07-01' } } },
    { id: 4, name: 'Matteo Vannucci', role: 'Responsabile Formazione', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=MV', documents: { cv: { name: 'CV_Vannucci.pdf', date: '2023-04-01' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-02-22' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: { name: 'Cert_BLSD_2023.pdf', date: '2023-12-10' }, procedure: null, patente: null, formazioneContinua: { name: 'Corso_Formatori.pdf', date: '2024-02-28' } } },
    { id: 5, name: 'Nadia Vuovolo', role: 'Segreteria - Call Center', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=NV', documents: { cv: { name: 'CV_Vuovolo.pdf', date: '2023-05-02' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-03-01' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: null, procedure: { name: 'Form_Procedure.pdf', date: '2023-05-10' }, patente: null, formazioneContinua: null } },
    { id: 6, name: 'Pasquale Milena', role: 'Coordinatore Infermieristico', contractType: 'Libero Professionista', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=PM', documents: { cv: { name: 'CV_Milena.pdf', date: '2023-09-01' }, idoneita: null, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-04-15' }, procedure: { name: 'Form_Procedure.pdf', date: '2023-09-10' }, patente: { name: 'Patente_B.pdf', date: '2011-06-25' }, formazioneContinua: { name: 'ECM_Coord_2024.pdf', date: '2024-05-30' } } },
    { id: 7, name: 'Cristina Bovone', role: 'Case Manager', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=CB', documents: { cv: { name: 'CV_Bovone.pdf', date: '2023-06-15' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-03-10' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: null, procedure: { name: 'Form_Procedure.pdf', date: '2023-06-20' }, patente: { name: 'Patente_B.pdf', date: '2014-01-18' }, formazioneContinua: { name: 'Corso_CaseMng.pdf', date: '2024-03-25' } } },
    { id: 8, name: 'Andrea Corradini', role: 'Fisioterapista', contractType: 'Libero Professionista', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=AC', documents: { cv: { name: 'CV_Corradini.pdf', date: '2023-07-01' }, idoneita: null, sicurezza: null, blsd: { name: 'Cert_BLSD_2023.pdf', date: '2023-11-20' }, procedure: { name: 'Form_Procedure.pdf', date: '2023-07-10' }, patente: { name: 'Patente_B.pdf', date: '2017-09-05' }, formazioneContinua: { name: 'ECM_Fisio_2024.pdf', date: '2024-06-10' } } },
    { id: 9, name: 'Emanuele Pisoni', role: 'Fisioterapista', contractType: 'Libero Professionista', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=EP', documents: { cv: { name: 'CV_Pisoni.pdf', date: '2023-08-20' }, idoneita: null, sicurezza: null, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-02-18' }, procedure: { name: 'Form_Procedure.pdf', date: '2023-09-01' }, patente: null, formazioneContinua: { name: 'ECM_Fisio_2024.pdf', date: '2024-06-10' } } },
    { id: 10, name: 'Ghita Dumitra', role: 'Infermiere', contractType: 'Libero Professionista', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=GD', documents: { cv: { name: 'CV_Dumitra.pdf', date: '2023-10-01' }, idoneita: null, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-05-11' }, procedure: { name: 'Form_Procedure.pdf', date: '2023-10-10' }, patente: { name: 'Patente_B.pdf', date: '2019-03-14' }, formazioneContinua: null } },
    { id: 11, name: 'Sasu Roxana', role: 'Infermiere', contractType: 'Libero Professionista', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=SR', documents: { cv: { name: 'CV_Roxana.pdf', date: '2023-11-15' }, idoneita: null, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-20' }, blsd: null, procedure: { name: 'Form_Procedure.pdf', date: '2023-11-20' }, patente: { name: 'Patente_B.pdf', date: '2020-01-30' }, formazioneContinua: { name: 'ECM_Inf_2024.pdf', date: '2024-06-22' } } },
    { id: 12, name: 'Ferrarotti Lucia', role: 'OSS', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=FL', documents: { cv: { name: 'CV_Ferrarotti.pdf', date: '2024-01-05' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-01-20' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-02-10' }, procedure: null, patente: { name: 'Patente_B.pdf', date: '2016-08-09' }, formazioneContinua: null } },
    { id: 13, name: 'Conzatti Anna', role: 'OSS', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=CA', documents: { cv: null, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-01-20' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-02-10' }, procedure: { name: 'Form_Procedure.pdf', date: '2024-01-25' }, patente: null, formazioneContinua: null } },
    { id: 14, name: 'Tononi Sabrina', role: 'OSS', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=TS', documents: { cv: { name: 'CV_Tononi.pdf', date: '2024-02-01' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-02-15' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: null, procedure: { name: 'Form_Procedure.pdf', date: '2024-02-10' }, patente: { name: 'Patente_B.pdf', date: '2021-04-12' }, formazioneContinua: null } },
    { id: 15, name: 'Romano Anna Tiziana', role: 'OSS', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=RA', documents: { cv: { name: 'CV_Romano.pdf', date: '2024-02-15' }, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-03-01' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: { name: 'Cert_BLSD_2024.pdf', date: '2024-03-20' }, procedure: { name: 'Form_Procedure.pdf', date: '2024-02-20' }, patente: { name: 'Patente_B.pdf', date: '2013-11-22' }, formazioneContinua: null } },
    { id: 16, name: 'Marella Eugenia', role: 'OSS', contractType: 'Dipendente', avatar: 'https://placehold.co/100x100/a8a29e/ffffff?text=ME', documents: { cv: null, idoneita: { name: 'Idoneita_Medica.pdf', date: '2024-03-01' }, sicurezza: { name: 'Form_Sicurezza.pdf', date: '2024-05-21' }, blsd: null, procedure: null, patente: null, formazioneContinua: null } },
];

const documentTypes = {
    cv: 'Curriculum Formativo',
    formazioneContinua: 'Attestazioni Formazione Continua',
    idoneita: 'Idoneità Psico-Fisica al Lavoro',
    sicurezza: 'Formazione Sicurezza sul Lavoro',
    blsd: 'Aggiornamento BLSD',
    procedure: 'Formazione Procedure Interne',
    patente: 'Patente di Guida',
};

// Componente per una singola riga di documento nel fascicolo
const DocumentRow = ({ docKey, doc, onUpload }) => {
    const fileInputRef = useRef(null);
    const handleUploadClick = () => { fileInputRef.current.click(); };
    const handleFileChange = (e) => { const file = e.target.files[0]; if (file) { onUpload(docKey, file); } };
    return (
        <div className="grid grid-cols-3 items-center gap-4 py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-white/10">
            <div className="col-span-3 sm:col-span-1"><p className="font-semibold text-gray-200">{documentTypes[docKey]}</p></div>
            <div className="col-span-3 sm:col-span-2 flex items-center justify-between gap-2">
                {doc ? (<div className="flex items-center gap-3 text-sm min-w-0"><FileIcon className="w-5 h-5 text-cyan-400 flex-shrink-0"/><div className="flex flex-col min-w-0"><span className="text-white font-medium truncate" title={doc.name}>{doc.name}</span><span className="text-gray-400 text-xs">Caricato il: {new Date(doc.date).toLocaleDateString('it-IT')}</span></div></div>) : (<div className="flex items-center gap-2 text-sm text-yellow-400"><XCircleIcon className="w-5 h-5"/><span>Documento mancante</span></div>)}
                <div className="flex gap-2 flex-shrink-0">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    {doc ? (<><Button className="text-xs bg-white/10 hover:bg-white/20 !px-3 !py-1">Visualizza</Button><Button onClick={handleUploadClick} className="text-xs bg-blue-500/50 hover:bg-blue-500/70 !px-3 !py-1">Sostituisci</Button></>) : (<Button onClick={handleUploadClick} className="text-xs bg-cyan-500/80 hover:bg-cyan-500 !px-3 !py-1"><UploadCloudIcon className="w-4 h-4 mr-1"/>Carica</Button>)}
                </div>
            </div>
        </div>
    );
};

// Modale con i dettagli del fascicolo dell'operatore
const OperatorDetailModal = ({ operator, onClose, onUpdateDocument }) => {
    if (!operator) return null;
    return (
        <Modal show={true} onClose={onClose} size="2xl">
            <div className="p-6 md:p-8 flex-shrink-0 border-b border-white/10"><div className="flex justify-between items-start"><div className="flex items-center gap-4"><img src={operator.avatar} alt={operator.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-cyan-400 object-cover"/><div className="min-w-0"><h3 className="text-2xl md:text-3xl font-bold text-white truncate">{operator.name}</h3><p className="text-base md:text-lg text-cyan-300">{operator.role}</p></div></div><Button onClick={onClose} className="bg-white/10 hover:bg-white/20 !p-2 rounded-full"><XCircleIcon className="w-6 h-6"/></Button></div></div>
            <div className="overflow-y-auto p-6 md:p-8"><h4 className="text-xl font-semibold text-white mb-4">Fascicolo Personale</h4><div className="space-y-2 bg-black/20 p-4 rounded-lg">{Object.keys(documentTypes).map(key => (<DocumentRow key={key} docKey={key} doc={operator.documents[key]} onUpload={(docKey, file) => onUpdateDocument(operator.id, docKey, file)}/>))}</div></div>
        </Modal>
    );
};

// NUOVO: Modale per la stampa dell'elenco del personale
const PrintOperatorListModal = ({ operators, onClose }) => {
    const printContentRef = useRef();

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=800,width=1200');
        printWindow.document.write('<html><head><title>Elenco Personale</title>');
        // Stili per la stampa
        printWindow.document.write(`
            <style>
                body { font-family: sans-serif; margin: 20px; color: #333; }
                h1, h2 { color: #005f73; border-bottom: 2px solid #94d2bd; padding-bottom: 5px; }
                h1 { font-size: 24px; }
                h2 { font-size: 20px; margin-top: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
                th { background-color: #e9f5f3; }
                .summary { background-color: #f1f1f1; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContentRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const groupedOperators = operators.reduce((acc, op) => {
        (acc[op.role] = acc[op.role] || []).push(op);
        return acc;
    }, {});

    const countCompletedDocs = (docs) => {
        return Object.values(docs).filter(doc => doc !== null).length;
    };
    const totalDocs = Object.keys(documentTypes).length;

    return (
        <Modal show={true} onClose={onClose} size="xl">
            <div className="p-6 md:p-8 flex-shrink-0 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Riepilogo Personale Operativo</h3>
                <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 !p-2 rounded-full"><XCircleIcon className="w-6 h-6"/></Button>
            </div>
            <div className="overflow-y-auto p-6 md:p-8" ref={printContentRef}>
                <div className="summary">
                    <h1 style={{color: '#0891b2'}}>Elenco Personale SOGEENP</h1>
                    <p><strong>Numero Totale Figure Professionali:</strong> {operators.length}</p>
                    <p><strong>Data di estrazione:</strong> {new Date().toLocaleDateString('it-IT')}</p>
                </div>

                {Object.entries(groupedOperators).map(([role, ops]) => (
                    <div key={role}>
                        <h2>{role} ({ops.length})</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nominativo</th>
                                    <th>Tipo Contratto</th>
                                    <th>Requisiti Professionali</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ops.map(op => (
                                    <tr key={op.id}>
                                        <td>{op.name}</td>
                                        <td>{op.contractType}</td>
                                        <td>{countCompletedDocs(op.documents)} / {totalDocs} completati</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end">
                <Button onClick={handlePrint} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">
                    <PrinterIcon className="w-5 h-5"/> Stampa
                </Button>
            </div>
        </Modal>
    );
};


const Operatori = ({ onBack }) => {
    const [operators, setOperators] = useState(initialOperators);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

    const handleUpdateDocument = (operatorId, docKey, file) => {
        console.log(`Simulazione di upload per l'operatore ${operatorId}, documento ${docKey}, file: ${file.name}`);
        setOperators(prevOperators => 
            prevOperators.map(op => op.id === operatorId ? { ...op, documents: { ...op.documents, [docKey]: { name: file.name, date: new Date().toISOString() } } } : op)
        );
        alert(`File "${file.name}" caricato (simulazione).`);
    };

    return (
        <>
            <OperatorDetailModal 
                operator={selectedOperator} 
                onClose={() => setSelectedOperator(null)}
                onUpdateDocument={handleUpdateDocument}
            />
            {isPrintModalOpen && <PrintOperatorListModal operators={operators} onClose={() => setIsPrintModalOpen(false)}/>}
            
            <div className="w-full max-w-7xl mx-auto p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-4xl font-bold text-white text-center sm:text-left">Personale Operativo</h2>
                    <div className="flex gap-4">
                        <Button onClick={() => setIsPrintModalOpen(true)} className="bg-white/10 hover:bg-white/20"><PrinterIcon className="w-5 h-5"/> Stampa Elenco Personale</Button>
                        <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Dashboard</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {operators.map(op => (
                        <div key={op.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center flex flex-col items-center shadow-lg transition-transform duration-300 hover:-translate-y-1">
                            <img src={op.avatar} alt={op.name} className="w-24 h-24 rounded-full border-2 border-cyan-400/50 object-cover mb-4"/>
                            <h3 className="text-xl font-bold text-white">{op.name}</h3>
                            <p className="text-cyan-300 mb-1 text-sm">{op.role}</p>
                            <p className="text-xs text-gray-400 mb-4">{op.contractType}</p>
                            <Button onClick={() => setSelectedOperator(op)} className="mt-auto w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-500/20 text-sm">
                                Gestisci Fascicolo
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


// --- Dashboard Principale (Aggiornata) ---
const Dashboard = ({ onNavigate }) => {
    const modules = [
        { id: 'assistiti', title: 'Assistiti', description: 'Gestisci l\'anagrafica degli assistiti.', icon: <UserIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
        { id: 'fascicolo', title: 'Fascicolo Sanitario', description: 'Compila e aggiorna il fascicolo domiciliare.', icon: <FileTextIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'diario', title: 'Diario Assistenziale', description: 'Registra gli accessi e le attività giornaliere.', icon: <BookUserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'operatori', title: 'Operatori', description: 'Anagrafica e turni del personale.', icon: <StethoscopeIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'documentazione', title: 'Documentazione', description: 'Carica e consulta i documenti.', icon: <FolderUpIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
        { id: 'formazione', title: 'Formazione', description: 'Materiale formativo e corsi per operatori.', icon: <GraduationCapIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
        { id: 'rischio', title: 'Rischio Clinico', description: 'Gestione e monitoraggio del rischio clinico.', icon: <ShieldAlertIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-4">Centrale Operativa Cure Domiciliari</h1>
                <p className="text-xl text-gray-300">Pannello di controllo per la gestione integrata dell'assistenza.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map(module => (
                    <DashboardCard
                        key={module.id}
                        title={module.title}
                        description={module.description}
                        icon={module.icon}
                        disabled={module.disabled}
                        onClick={() => onNavigate(module.id)}
                    />
                ))}
            </div>
        </div>
    );
};


// --- Componente Principale App (Aggiornato) ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'fascicolo':
                return <FascicoloSanitario onBack={() => handleNavigation('dashboard')} />;
            case 'diario':
                return <DiarioAssistenziale onBack={() => handleNavigation('dashboard')} />;
            case 'operatori':
                return <Operatori onBack={() => handleNavigation('dashboard')} />;
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
