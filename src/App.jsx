import React, { useState, useRef, useEffect } from 'react';

// --- MVP VERSIONE LOCALE ---
// Questa versione funziona completamente senza dipendenze esterne
// e può essere facilmente integrata con qualsiasi servizio cloud storage

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
const FileIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);

// --- Nuove icone per Operatori ---
const OrganizationIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 21h8"/><path d="M12 17v4"/><path d="M4 13h16l-2-9H6l-2 9Z"/><circle cx="12" cy="10" r="2"/></svg>);
const BriefcaseIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const AwardIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>);
const CalendarIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>);

// --- DATI OPERATORI SOGEENP ---
const OPERATORI_SOGEENP = [
    // Direzione
    { id: 1, full_name: "Dott.ssa Cecilia Matta", role: "Direttore", department: "Direzione", level: "Direzione", phone: "", email: "", hire_date: "2020-01-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 2, full_name: "Federica Pastorino", role: "Vice-Direttore e RQ", department: "Direzione", level: "Direzione", phone: "", email: "", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 3, full_name: "Lorenzo GRECU", role: "Direttore e Medico Responsabile", department: "Direzione", level: "Direzione", phone: "", email: "", hire_date: "2019-11-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // Staff Coordinamento
    { id: 4, full_name: "Nadia Vuovolo", role: "Segreteria – Call Center", department: "Amministrazione", level: "Staff", phone: "", email: "", hire_date: "2021-02-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 5, full_name: "Pasquale Milena", role: "Coordinatore Infermieristico", department: "Assistenza", level: "Coordinamento", phone: "", email: "", hire_date: "2020-06-01", note: "L.P.", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 6, full_name: "Cristina Bovone", role: "Case Manager", department: "Assistenza", level: "Coordinamento", phone: "", email: "", hire_date: "2021-01-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 7, full_name: "Matteo Vannucci", role: "Responsabile Formazione", department: "Formazione", level: "Staff", phone: "", email: "", hire_date: "2021-09-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // Professionisti Sanitari
    { id: 8, full_name: "Ghita Dumitra", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2021-03-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 9, full_name: "Sasu Roxana", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2021-04-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 10, full_name: "Andrea Corradini", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2020-10-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 11, full_name: "Emanuele Pisoni", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2021-01-20", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 12, full_name: "Federica Pastorino", role: "Psicologa", department: "Assistenza", level: "Staff", phone: "", email: "", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // OSS
    { id: 13, full_name: "Ferrarotti Lucia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2020-08-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 14, full_name: "Conzatti Anna", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2020-09-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 15, full_name: "Tononi Sabrina", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2021-02-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 16, full_name: "Romano Anna Tiziana", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2020-12-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 17, full_name: "Marella Eugenia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2021-05-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } }
];
const MOCK_ASSISTITI = [
    {
        id: 1,
        first_name: "Mario",
        last_name: "Rossi",
        tax_code: "RSSMRA80A01H501K",
        address_street: "Via Roma 123, Milano",
        start_of_care_date: "2024-01-15",
        fascicolo_completo: false,
        diario_entries: [
            {
                id: 1,
                entry_timestamp: "2024-01-20T09:00:00",
                operator_name: "Ghita Dumitra (Infermiere)",
                services_provided: "Controllo parametri vitali, medicazione ulcera"
            }
        ]
    },
    {
        id: 2,
        first_name: "Anna",
        last_name: "Bianchi",
        tax_code: "BNCNNA85B15F205W",
        address_street: "Corso Italia 45, Torino",
        start_of_care_date: "2024-02-01",
        fascicolo_completo: true,
        diario_entries: []
    }
];

const MOCK_DOCUMENTS = [
    {
        id: 1,
        title: "Procedura Igiene delle Mani",
        version: "1.2",
        type: "Procedura",
        url: "#",
        updated_at: "2024-01-10"
    },
    {
        id: 2,
        title: "Linee Guida Gestione Dolore",
        version: "2.0",
        type: "Linea Guida",
        url: "#",
        updated_at: "2024-01-05"
    }
];
const OPERATORI_SOGEENP = [
    // Direzione
    { id: 1, full_name: "Dott.ssa Cecilia Matta", role: "Direttore", department: "Direzione", level: "Direzione", phone: "", email: "", hire_date: "2020-01-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 2, full_name: "Federica Pastorino", role: "Vice-Direttore e RQ", department: "Direzione", level: "Direzione", phone: "", email: "", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 3, full_name: "Lorenzo GRECU", role: "Direttore e Medico Responsabile", department: "Direzione", level: "Direzione", phone: "", email: "", hire_date: "2019-11-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // Staff Coordinamento
    { id: 4, full_name: "Nadia Vuovolo", role: "Segreteria – Call Center", department: "Amministrazione", level: "Staff", phone: "", email: "", hire_date: "2021-02-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 5, full_name: "Pasquale Milena", role: "Coordinatore Infermieristico", department: "Assistenza", level: "Coordinamento", phone: "", email: "", hire_date: "2020-06-01", note: "L.P.", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 6, full_name: "Cristina Bovone", role: "Case Manager", department: "Assistenza", level: "Coordinamento", phone: "", email: "", hire_date: "2021-01-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 7, full_name: "Matteo Vannucci", role: "Responsabile Formazione", department: "Formazione", level: "Staff", phone: "", email: "", hire_date: "2021-09-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // Professionisti Sanitari
    { id: 8, full_name: "Ghita Dumitra", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2021-03-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 9, full_name: "Sasu Roxana", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2021-04-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 10, full_name: "Andrea Corradini", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2020-10-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 11, full_name: "Emanuele Pisoni", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "", email: "", hire_date: "2021-01-20", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 12, full_name: "Federica Pastorino", role: "Psicologa", department: "Assistenza", level: "Staff", phone: "", email: "", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // OSS
    { id: 13, full_name: "Ferrarotti Lucia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2020-08-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 14, full_name: "Conzatti Anna", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2020-09-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 15, full_name: "Tononi Sabrina", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2021-02-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 16, full_name: "Romano Anna Tiziana", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2020-12-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 17, full_name: "Marella Eugenia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "", email: "", hire_date: "2021-05-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } }
];

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

// --- Componenti Fascicolo Operatore ---
const FascicoloOperatoreModal = ({ show, onClose, operatore, onUpdateFascicolo }) => {
    const [activeTab, setActiveTab] = useState('anagrafica');
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        phone: operatore?.phone || '',
        email: operatore?.email || '',
        indirizzo: operatore?.indirizzo || '',
        codiceFiscale: operatore?.codiceFiscale || '',
        dataNascita: operatore?.dataNascita || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (file, type) => {
        setIsUploading(true);
        try {
            // Simula upload - qui puoi integrare qualsiasi servizio cloud storage
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (type === 'attestati' || type === 'formazione') {
                // Per file multipli, aggiungi alla lista esistente
                const currentFiles = operatore.fascicolo?.[type] || [];
                await onUpdateFascicolo(operatore.id, { [type]: [...currentFiles, file.name] });
            } else {
                // Per file singoli (curriculum)
                await onUpdateFascicolo(operatore.id, { [type]: file.name });
            }
            
            alert(`${type} caricato con successo!`);
        } catch (error) {
            alert(`Errore nel caricamento: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveAnagrafica = async () => {
        await onUpdateFascicolo(operatore.id, { anagrafica: formData });
        alert("Dati anagrafici salvati!");
    };

    if (!show || !operatore) return null;

    return (
        <Modal show={show} onClose={onClose} size="2xl">
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                            <UserIcon className="w-8 h-8 text-white"/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{operatore.full_name}</h2>
                            <p className="text-cyan-300">{operatore.role} - {operatore.department}</p>
                        </div>
                    </div>
                    <Button onClick={onClose} className="bg-white/10 hover:bg-white/20">
                        <XCircleIcon className="w-5 h-5"/>
                    </Button>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-white/10 p-1 rounded-lg mb-6">
                    {[
                        { id: 'anagrafica', label: 'Anagrafica', icon: <UserIcon className="w-4 h-4"/> },
                        { id: 'curriculum', label: 'Curriculum', icon: <BriefcaseIcon className="w-4 h-4"/> },
                        { id: 'attestati', label: 'Attestati', icon: <AwardIcon className="w-4 h-4"/> },
                        { id: 'formazione', label: 'Formazione', icon: <CalendarIcon className="w-4 h-4"/> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                                activeTab === tab.id 
                                    ? 'bg-cyan-500 text-white' 
                                    : 'text-gray-300 hover:bg-white/10'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-96">
                    {activeTab === 'anagrafica' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Dati Anagrafici</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput 
                                    label="Telefono" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleInputChange}
                                    placeholder="+39 xxx xxx xxxx"
                                />
                                <FormInput 
                                    label="Email" 
                                    name="email" 
                                    type="email"
                                    value={formData.email} 
                                    onChange={handleInputChange}
                                    placeholder="nome@esempio.it"
                                />
                                <FormInput 
                                    label="Data di Nascita" 
                                    name="dataNascita" 
                                    type="date"
                                    value={formData.dataNascita} 
                                    onChange={handleInputChange}
                                />
                                <FormInput 
                                    label="Codice Fiscale" 
                                    name="codiceFiscale" 
                                    value={formData.codiceFiscale} 
                                    onChange={handleInputChange}
                                    placeholder="RSSMRA80A01H501K"
                                />
                                <div className="col-span-2">
                                    <FormInput 
                                        label="Indirizzo" 
                                        name="indirizzo" 
                                        value={formData.indirizzo} 
                                        onChange={handleInputChange}
                                        placeholder="Via, numero civico, città"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button onClick={handleSaveAnagrafica} className="bg-gradient-to-r from-cyan-500 to-blue-500">
                                    Salva Dati Anagrafici
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'curriculum' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Curriculum Vitae</h3>
                            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                                <UploadCloudIcon className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                                <p className="text-gray-300 mb-4">Carica il curriculum vitae (PDF)</p>
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={(e) => handleFileUpload(e.target.files[0], 'curriculum')}
                                    className="hidden" 
                                    id="curriculum-upload"
                                    disabled={isUploading}
                                />
                                <label 
                                    htmlFor="curriculum-upload" 
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg cursor-pointer hover:bg-cyan-400 transition"
                                >
                                    {isUploading ? 'Caricamento...' : 'Seleziona File'}
                                </label>
                                {operatore.fascicolo?.curriculum && (
                                    <p className="text-green-400 mt-2">✓ Curriculum caricato: {operatore.fascicolo.curriculum}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'attestati' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Attestati e Certificazioni</h3>
                            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                                <AwardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                                <p className="text-gray-300 mb-4">Carica attestati, diplomi, certificazioni (PDF)</p>
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    multiple
                                    onChange={(e) => {
                                        Array.from(e.target.files).forEach(file => {
                                            handleFileUpload(file, 'attestati');
                                        });
                                    }}
                                    className="hidden" 
                                    id="attestati-upload"
                                    disabled={isUploading}
                                />
                                <label 
                                    htmlFor="attestati-upload" 
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg cursor-pointer hover:bg-cyan-400 transition"
                                >
                                    {isUploading ? 'Caricamento...' : 'Seleziona File (Multipli)'}
                                </label>
                                {operatore.fascicolo?.attestati?.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {operatore.fascicolo.attestati.map((attestato, index) => (
                                            <p key={index} className="text-green-400">✓ {attestato}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'formazione' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white mb-4">Formazione e Aggiornamenti</h3>
                            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                                <p className="text-gray-300 mb-4">Carica certificati di formazione, ECM, corsi (PDF)</p>
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    multiple
                                    onChange={(e) => {
                                        Array.from(e.target.files).forEach(file => {
                                            handleFileUpload(file, 'formazione');
                                        });
                                    }}
                                    className="hidden" 
                                    id="formazione-upload"
                                    disabled={isUploading}
                                />
                                <label 
                                    htmlFor="formazione-upload" 
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg cursor-pointer hover:bg-cyan-400 transition"
                                >
                                    {isUploading ? 'Caricamento...' : 'Seleziona File (Multipli)'}
                                </label>
                                {operatore.fascicolo?.formazione?.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {operatore.fascicolo.formazione.map((corso, index) => (
                                            <p key={index} className="text-green-400">✓ {corso}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

// --- Componente Card Operatore ---
const OperatoreCard = ({ operatore, onOpenFascicolo }) => {
    const getRoleIcon = (role) => {
        if (role.includes('Direttore')) return <OrganizationIcon className="w-6 h-6 text-purple-300"/>;
        if (role.includes('Coordinatore') || role.includes('Manager')) return <UserIcon className="w-6 h-6 text-blue-300"/>;
        if (role.includes('Infermiere')) return <StethoscopeIcon className="w-6 h-6 text-green-300"/>;
        if (role.includes('Fisioterapista')) return <StethoscopeIcon className="w-6 h-6 text-orange-300"/>;
        if (role.includes('OSS')) return <UserIcon className="w-6 h-6 text-cyan-300"/>;
        if (role.includes('Psicologa')) return <UserIcon className="w-6 h-6 text-pink-300"/>;
        return <UserIcon className="w-6 h-6 text-gray-300"/>;
    };

    const getLevelColor = (level) => {
        switch(level) {
            case 'Direzione': return 'from-purple-500 to-pink-500';
            case 'Coordinamento': return 'from-blue-500 to-indigo-500';
            case 'Staff': return 'from-green-500 to-teal-500';
            case 'Operativo': return 'from-cyan-500 to-blue-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const getCompletionPercentage = () => {
        let completed = 0;
        let total = 4; // anagrafica, curriculum, attestati, formazione
        
        if (operatore.phone && operatore.email) completed++;
        if (operatore.fascicolo?.curriculum) completed++;
        if (operatore.fascicolo?.attestati?.length > 0) completed++;
        if (operatore.fascicolo?.formazione?.length > 0) completed++;
        
        return (completed / total) * 100;
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getLevelColor(operatore.level)} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getRoleIcon(operatore.role)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{operatore.full_name}</h3>
                        <p className="text-sm text-cyan-300">{operatore.role}</p>
                        <p className="text-xs text-gray-400">{operatore.department}</p>
                        {operatore.note && (
                            <span className="inline-block bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full mt-1">
                                {operatore.note}
                            </span>
                        )}
                    </div>
                </div>
                <div className="text-right">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                        operatore.level === 'Direzione' ? 'bg-purple-400' :
                        operatore.level === 'Coordinamento' ? 'bg-blue-400' :
                        operatore.level === 'Staff' ? 'bg-green-400' : 'bg-cyan-400'
                    }`}></span>
                    <p className="text-xs text-gray-400 mt-1">{operatore.level}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Completamento Fascicolo</span>
                        <span className="text-xs text-white">{Math.round(getCompletionPercentage())}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getCompletionPercentage()}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-400">
                        <p>Assunto: {new Date(operatore.hire_date).toLocaleDateString('it-IT')}</p>
                    </div>
                    <Button 
                        onClick={() => onOpenFascicolo(operatore)}
                        className="text-sm !py-1 !px-3 bg-white/10 hover:bg-white/20"
                    >
                        <BriefcaseIcon className="w-4 h-4 mr-1"/>
                        Fascicolo
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Componente Operatori Potenziato ---
const OperatoriEnhanced = ({ onNavigate, operators, onUpdateOperatoreFascicolo }) => {
    const [selectedOperatore, setSelectedOperatore] = useState(null);
    const [isFascicoloOpen, setIsFascicoloOpen] = useState(false);
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [filterLevel, setFilterLevel] = useState('all');

    const departments = [...new Set(operators.map(op => op.department))];
    const levels = [...new Set(operators.map(op => op.level))];

    const filteredOperators = operators.filter(op => {
        const departmentMatch = filterDepartment === 'all' || op.department === filterDepartment;
        const levelMatch = filterLevel === 'all' || op.level === filterLevel;
        return departmentMatch && levelMatch;
    });

    const handleOpenFascicolo = (operatore) => {
        setSelectedOperatore(operatore);
        setIsFascicoloOpen(true);
    };

    const getOperatorsByLevel = (level) => {
        return filteredOperators.filter(op => op.level === level);
    };

    return (
        <>
            <FascicoloOperatoreModal 
                show={isFascicoloOpen}
                onClose={() => setIsFascicoloOpen(false)}
                operatore={selectedOperatore}
                onUpdateFascicolo={onUpdateOperatoreFascicolo}
            />
            
            <div className="w-full max-w-7xl mx-auto p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Operatori SOGEENP</h2>
                        <p className="text-lg text-gray-300">Organigramma Cure Domiciliari (3.2.3.2.)</p>
                    </div>
                    <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                        &larr; Dashboard
                    </Button>
                </div>

                {/* Filtri */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Filtra per Dipartimento</label>
                            <select 
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white"
                            >
                                <option value="all">Tutti i Dipartimenti</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Filtra per Livello</label>
                            <select 
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white"
                            >
                                <option value="all">Tutti i Livelli</option>
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-300">Totale operatori: <span className="font-bold text-white">{filteredOperators.length}</span></p>
                        </div>
                    </div>
                </div>

                {/* Visualizzazione per livelli */}
                <div className="space-y-8">
                    {['Direzione', 'Coordinamento', 'Staff', 'Operativo'].map(level => {
                        const operatorsInLevel = getOperatorsByLevel(level);
                        if (operatorsInLevel.length === 0) return null;
                        
                        return (
                            <div key={level} className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className={`w-4 h-4 rounded-full ${
                                        level === 'Direzione' ? 'bg-purple-400' :
                                        level === 'Coordinamento' ? 'bg-blue-400' :
                                        level === 'Staff' ? 'bg-green-400' : 'bg-cyan-400'
                                    }`}></span>
                                    {level}
                                    <span className="text-sm text-gray-400 font-normal">({operatorsInLevel.length})</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {operatorsInLevel.map(operatore => (
                                        <OperatoreCard 
                                            key={operatore.id}
                                            operatore={operatore}
                                            onOpenFascicolo={handleOpenFascicolo}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

// --- Modulo Assistiti ---
const NuovoAssistitoModal = ({ show, onClose, onAddAssistito }) => {
    const [anagrafica, setAnagrafica] = useState({ nome: '', cognome: '', codiceFiscale: '', indirizzo: '' });
    const handleChange = (e) => { const { name, value } = e.target; setAnagrafica(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!anagrafica.nome || !anagrafica.cognome || !anagrafica.codiceFiscale) { alert("Nome, Cognome e Codice Fiscale sono obbligatori."); return; }
        await onAddAssistito(anagrafica);
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
                                    <div><h3 className="text-lg font-bold text-white">{a.first_name} {a.last_name}</h3><p className="text-sm text-gray-300">{a.address_street}</p></div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 border-t border-white/10 pt-3 mt-3 space-y-1">
                                <p>Fascicolo: <span className={a.fascicolo_completo ? 'text-green-400 font-semibold' : 'text-yellow-400 font-semibold'}>{a.fascicolo_completo ? 'Compilato' : 'Da Compilare'}</span></p>
                                <p>Diario: <span className="text-white font-semibold">{a.diario_entries?.length || 0}</span> accessi registrati</p>
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
    const handleSubmit = async (e) => { e.preventDefault(); await onUpdateFascicolo(assistito.id, fascicoloData); };
    return (
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div><h2 className="text-3xl font-bold text-white">Fascicolo Sanitario</h2><p className="text-lg text-cyan-300">{assistito.first_name} {assistito.last_name}</p></div>
                <Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna all'elenco</Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <section><h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-300/30 pb-2">Dati Clinici e Assistenziali</h3><div className="grid md:grid-cols-2 gap-6"><FormInput label="Data Inizio Cure Domiciliari" name="dataInizioCure" value={fascicoloData.dataInizioCure} onChange={handleChange} type="date" /><div className="flex items-center space-x-4 pt-6"><input type="checkbox" id="consensoInformato" name="consensoInformato" checked={fascicoloData.consensoInformato} onChange={handleChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="consensoInformato" className="text-gray-200">Consenso Informato ricevuto</label></div><div className="md:col-span-2"><FormTextarea label="Diagnosi" name="diagnosi" value={fascicoloData.diagnosi} onChange={handleChange} placeholder="Descrivere la diagnosi principale" /></div><div className="md:col-span-2"><FormTextarea label="Elementi di Rischio Sanitario ed Assistenziale" name="rischi" value={fascicoloData.rischi} onChange={handleChange} placeholder="Es. allergie, rischio caduta, piaghe da decubito..." /></div></div></section>
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
                            <div className="flex items-center gap-4"><UserIcon className="w-6 h-6 text-cyan-300"/><div><p className="font-bold text-white">{a.first_name} {a.last_name}</p><p className="text-sm text-gray-400">{a.tax_code}</p></div></div>
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
    const handleAddEntry = async (e) => {
        e.preventDefault();
        if(newEntry.dateTime && newEntry.operator && newEntry.services) { await onUpdateDiario(assistito.id, newEntry); setIsModalOpen(false); setNewEntry({ dateTime: '', operator: '', services: '', operatorSigned: false, patientSigned: false }); } 
        else { alert("Per favore, compila tutti i campi richiesti."); }
    };
    return (
        <>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-8"><h3 className="text-2xl font-bold text-white mb-6">Aggiungi Nuovo Accesso</h3>
                <form onSubmit={handleAddEntry} className="space-y-4">
                    <FormInput label="Data e Ora" name="dateTime" type="datetime-local" value={newEntry.dateTime} onChange={handleInputChange} />
                    <FormSelect label="Operatore/i" name="operator" value={newEntry.operator} onChange={handleInputChange}>
                        <option value="" disabled>Seleziona...</option>
                        {operators.map(op => <option key={op.id} value={`${op.full_name} (${op.role})`}>{op.full_name} ({op.role})</option>)}
                    </FormSelect>
                    <FormTextarea label="Prestazioni Svolte" name="services" value={newEntry.services} onChange={handleInputChange} placeholder="Descrivere le attività..."/>
                    <div className="space-y-3 pt-4"><div className="flex items-center"><input id="operatorSigned" name="operatorSigned" type="checkbox" checked={newEntry.operatorSigned} onChange={handleInputChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="operatorSigned" className="ml-3 text-gray-300">Firma dell'operatore apposta</label></div><div className="flex items-center"><input id="patientSigned" name="patientSigned" type="checkbox" checked={newEntry.patientSigned} onChange={handleInputChange} className="h-5 w-5 rounded text-cyan-500 bg-white/20 border-white/30 focus:ring-cyan-400"/><label htmlFor="patientSigned" className="ml-3 text-gray-300">Firma dell'assistito/caregiver apposta</label></div></div>
                    <div className="flex justify-end gap-4 pt-6"><Button onClick={() => setIsModalOpen(false)} className="bg-transparent text-gray-300 hover:bg-white/10">Annulla</Button><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">Aggiungi</Button></div>
                </form></div>
            </Modal>
            <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6"><div><h2 className="text-3xl font-bold text-white">Diario Assistenziale</h2><p className="text-lg text-cyan-300">{assistito.first_name} {assistito.last_name}</p></div><Button onClick={onBack} className="bg-white/10 hover:bg-white/20">&larr; Torna all'elenco</Button></div>
                <div className="flex justify-end mb-6"><Button onClick={() => setIsModalOpen(true)} className="bg-white/10 hover:bg-white/20"><PlusCircleIcon className="w-5 h-5"/> Aggiungi Accesso</Button></div>
                <div className="space-y-6">
                    {assistito.diario_entries && assistito.diario_entries.length > 0 ? [...assistito.diario_entries].reverse().map(entry => (
                        <div key={entry.id} className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <div className="flex justify-between items-start mb-3"><div><p className="font-bold text-lg text-white">{new Date(entry.entry_timestamp).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p><p className="text-sm text-gray-300">Ore: {new Date(entry.entry_timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p></div><p className="text-sm text-gray-300 font-medium bg-cyan-900/50 px-3 py-1 rounded-full">{entry.operator_name}</p></div>
                            <p className="text-gray-200 mb-4">{entry.services_provided}</p>
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
                            <div className="flex items-center gap-4"><UserIcon className="w-6 h-6 text-cyan-300"/><div><p className="font-bold text-white">{a.first_name} {a.last_name}</p><p className="text-sm text-gray-400">{a.tax_code}</p></div></div>
                            <Button className="text-sm !py-1 !px-3 bg-white/10 hover:bg-white/20">Gestisci Diario</Button>
                        </div>
                    )) : (<div className="text-center py-10"><p className="text-gray-400">Nessun assistito trovato. Creane uno dal modulo "Assistiti".</p></div>)}
                </div>
            </div>
        </div>
    );
};

// --- Modulo Documentazione ---
const DocumentoModal = ({ show, onClose, onSave, documentoToEdit }) => {
    const [docData, setDocData] = useState({ title: '', version: '', type: 'Procedura', file: null });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (documentoToEdit) {
            setDocData({ title: documentoToEdit.title, version: documentoToEdit.version, type: documentoToEdit.type, file: null });
        } else {
            setDocData({ title: '', version: '', type: 'Procedura', file: null });
        }
    }, [documentoToEdit, show]);

    const handleFileChange = (e) => { setDocData(prev => ({ ...prev, file: e.target.files[0] })); };
    const handleChange = (e) => { const { name, value } = e.target; setDocData(prev => ({ ...prev, [name]: value })); };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!docData.title || (!docData.file && !documentoToEdit)) { alert("Titolo e file sono obbligatori."); return; }
        setIsUploading(true);
        try {
            await onSave(docData, documentoToEdit?.id, documentoToEdit?.storage_path);
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
            <div className="p-8"><h3 className="text-2xl font-bold text-white mb-6">{documentoToEdit ? 'Modifica Documento' : 'Carica Nuovo Documento'}</h3>
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
                    <div className="flex justify-end gap-4 pt-6"><Button onClick={onClose} className="bg-transparent text-gray-300 hover:bg-white/10" disabled={isUploading}>Annulla</Button><Button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400" disabled={isUploading}>{isUploading ? 'Salvataggio...' : 'Salva su Cloud'}</Button></div>
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

// --- Dashboard Principale ---
const Dashboard = ({ onNavigate }) => {
    const modules = [
        { id: 'assistiti', title: 'Assistiti', description: 'Crea e gestisci l\'anagrafica degli assistiti.', icon: <UserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'fascicolo-hub', title: 'Fascicolo Sanitario', description: 'Compila i dati clinici degli assistiti.', icon: <FileTextIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'diario-hub', title: 'Diario Assistenziale', description: 'Registra gli accessi e le attività giornaliere.', icon: <BookUserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'operatori', title: 'Operatori', description: 'Anagrafica e fascicoli del personale.', icon: <StethoscopeIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
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

// --- Componente Principale App ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [assistiti, setAssistiti] = useState(MOCK_ASSISTITI);
    const [operators, setOperators] = useState(OPERATORI_SOGEENP);
    const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
    const [selectedAssistito, setSelectedAssistito] = useState(null);
    
    // Simulazione ID incrementale per nuovi record
    const [nextAssistitoId, setNextAssistitoId] = useState(3);
    const [nextDocumentId, setNextDocumentId] = useState(3);

    const handleAddAssistito = async (anagrafica) => {
        try {
            const nuovoAssistito = {
                id: nextAssistitoId,
                first_name: anagrafica.nome,
                last_name: anagrafica.cognome,
                tax_code: anagrafica.codiceFiscale,
                address_street: anagrafica.indirizzo,
                start_of_care_date: new Date().toISOString().split('T')[0],
                fascicolo_completo: false,
                diario_entries: []
            };
            
            setAssistiti(prev => [...prev, nuovoAssistito]);
            setNextAssistitoId(prev => prev + 1);
            
            console.log('Nuovo assistito aggiunto:', nuovoAssistito);
        } catch (error) {
            alert('Errore nell\'aggiunta dell\'assistito: ' + error.message);
        }
    };

    const handleUpdateFascicolo = async (assistitoId, fascicoloData) => {
        try {
            setAssistiti(prev => prev.map(a => 
                a.id === assistitoId 
                    ? { ...a, fascicolo: fascicoloData, fascicolo_completo: true }
                    : a
            ));
            alert("Fascicolo salvato con successo!");
            setCurrentPage('fascicolo-hub');
        } catch (error) {
            alert('Errore nel salvataggio del fascicolo: ' + error.message);
        }
    };

    const handleUpdateDiario = async (assistitoId, nuovoIntervento) => {
        try {
            const nuovaEntry = {
                id: Date.now(), // Simula ID univoco
                entry_timestamp: nuovoIntervento.dateTime,
                operator_name: nuovoIntervento.operator,
                services_provided: nuovoIntervento.services,
            };

            let updatedPatient = null;
            setAssistiti(prev => prev.map(a => {
                if (a.id === assistitoId) {
                    const updatedDiario = a.diario_entries ? [...a.diario_entries, nuovaEntry] : [nuovaEntry];
                    updatedPatient = { ...a, diario_entries: updatedDiario };
                    return updatedPatient;
                }
                return a;
            }));
            
            if (updatedPatient) {
                setSelectedAssistito(updatedPatient);
            }
            
            console.log('Nuovo intervento aggiunto:', nuovaEntry);
        } catch (error) {
            alert('Errore nell\'aggiunta dell\'intervento: ' + error.message);
        }
    };

    const handleUpdateOperatoreFascicolo = async (operatoreId, updateData) => {
        try {
            setOperators(prev => prev.map(op => {
                if (op.id === operatoreId) {
                    return {
                        ...op,
                        ...updateData.anagrafica,
                        fascicolo: {
                            ...op.fascicolo,
                            ...updateData
                        }
                    };
                }
                return op;
            }));
            
            console.log('Fascicolo operatore aggiornato:', { operatoreId, updateData });
        } catch (error) {
            console.error('Errore aggiornamento fascicolo:', error);
            throw error;
        }
    };
    
    const handleAddOrUpdateDocumento = async (docData, docIdToUpdate, oldStoragePath) => {
        try {
            // Simula upload file
            let fileUrl = null;
            if (docData.file) {
                // Simula il caricamento del file
                await new Promise(resolve => setTimeout(resolve, 1000));
                fileUrl = `https://mock-storage.example.com/docs/${Date.now()}_${docData.file.name}`;
            }

            const documentData = {
                title: docData.title,
                version: docData.version,
                type: docData.type,
                updated_at: new Date().toISOString(),
                url: fileUrl || (docIdToUpdate ? documents.find(d => d.id === docIdToUpdate)?.url : null)
            };

            if (docIdToUpdate) {
                setDocuments(prev => prev.map(doc => 
                    doc.id === docIdToUpdate 
                        ? { ...doc, ...documentData }
                        : doc
                ));
                alert("Documento modificato con successo!");
            } else {
                const nuovoDocumento = {
                    id: nextDocumentId,
                    ...documentData
                };
                setDocuments(prev => [...prev, nuovoDocumento]);
                setNextDocumentId(prev => prev + 1);
                alert("Documento caricato e salvato con successo!");
            }
            
            // Refresh della lista documenti
            window.location.reload = false; // Previeni reload automatico
        } catch (error) {
            console.error('Errore nel salvataggio del documento:', error);
            alert('Errore nel salvataggio del documento: ' + error.message);
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
            case 'operatori': return <OperatoriEnhanced onNavigate={handleNavigation} operators={operators} onUpdateOperatoreFascicolo={handleUpdateOperatoreFascicolo} />;
            case 'documentazione': return <Documentazione onNavigate={handleNavigation} documents={documents} onAddOrUpdateDocumento={handleAddOrUpdateDocumento} />;
            case 'formazione': return <Formazione onBack={() => handleNavigation('dashboard')} />;
            case 'dashboard':
            default:
                return <Dashboard onNavigate={handleNavigation} />;
        }
    };

    return (<main className="min-h-screen w-full bg-gray-900 bg-gradient-to-br from-gray-900 via-blue-900/40 to-gray-900 text-white font-sans flex items-center justify-center p-4 sm:p-6 lg:p-8">{renderPage()}</main>);
}
