import React, { useState, useEffect } from 'react';

// --- ICONE SVG ---
const UserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileTextIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>);
const BookUserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/><path d="M15 13a3 3 0 1 0-6 0"/></svg>);
const StethoscopeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>);
const FolderUpIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3-3-3 3"/></svg>);
const GraduationCapIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>);
const ShieldAlertIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>);
const PlusCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>);
const XCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>);
const UploadCloudIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>);
const EditIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const OrganizationIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 21h8"/><path d="M12 17v4"/><path d="M4 13h16l-2-9H6l-2 9Z"/><circle cx="12" cy="10" r="2"/></svg>);
const BriefcaseIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const AwardIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>);
const CalendarIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>);

// --- DATI MOCK ---
const OPERATORI_SOGEENP = [
    // Direzione
    { id: 1, full_name: "Dott.ssa Cecilia Matta", role: "Direttore", department: "Direzione", level: "Direzione", phone: "+39 011 123456", email: "c.matta@sogeenp.it", hire_date: "2020-01-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 2, full_name: "Federica Pastorino", role: "Vice-Direttore e RQ", department: "Direzione", level: "Direzione", phone: "+39 011 123457", email: "f.pastorino@sogeenp.it", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 3, full_name: "Lorenzo GRECU", role: "Direttore e Medico Responsabile", department: "Direzione", level: "Direzione", phone: "+39 011 123458", email: "l.grecu@sogeenp.it", hire_date: "2019-11-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // Staff e Coordinamento
    { id: 4, full_name: "Nadia Vuovolo", role: "Segreteria – Call Center", department: "Amministrazione", level: "Staff", phone: "+39 011 123459", email: "n.vuovolo@sogeenp.it", hire_date: "2021-02-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 5, full_name: "Pasquale Milena", role: "Coordinatore Infermieristico", department: "Assistenza", level: "Coordinamento", phone: "+39 011 123460", email: "p.milena@sogeenp.it", hire_date: "2020-06-01", note: "L.P.", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 6, full_name: "Cristina Bovone", role: "Case Manager", department: "Assistenza", level: "Coordinamento", phone: "+39 011 123461", email: "c.bovone@sogeenp.it", hire_date: "2021-01-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 7, full_name: "Matteo Vannucci", role: "Responsabile Formazione", department: "Formazione", level: "Staff", phone: "+39 011 123462", email: "m.vannucci@sogeenp.it", hire_date: "2021-09-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 12, full_name: "Federica Pastorino", role: "Psicologa", department: "Assistenza", level: "Staff", phone: "+39 011 123467", email: "f.pastorino.psi@sogeenp.it", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // Professionisti Sanitari
    { id: 8, full_name: "Ghita Dumitra", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "+39 011 123463", email: "g.dumitra@sogeenp.it", hire_date: "2021-03-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 9, full_name: "Sasu Roxana", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "+39 011 123464", email: "s.roxana@sogeenp.it", hire_date: "2021-04-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 10, full_name: "Andrea Corradini", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "+39 011 123465", email: "a.corradini@sogeenp.it", hire_date: "2020-10-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 11, full_name: "Emanuele Pisoni", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "+39 011 123466", email: "e.pisoni@sogeenp.it", hire_date: "2021-01-20", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    
    // OSS
    { id: 13, full_name: "Ferrarotti Lucia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123468", email: "l.ferrarotti@sogeenp.it", hire_date: "2020-08-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 14, full_name: "Conzatti Anna", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123469", email: "a.conzatti@sogeenp.it", hire_date: "2020-09-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 15, full_name: "Tononi Sabrina", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123470", email: "s.tononi@sogeenp.it", hire_date: "2021-02-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 16, full_name: "Romano Anna Tiziana", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123471", email: "a.romano@sogeenp.it", hire_date: "2020-12-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
    { id: 17, full_name: "Marella Eugenia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123472", email: "e.marella@sogeenp.it", hire_date: "2021-05-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } }
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

// --- COMPONENTI UI ---
const DashboardCard = ({ icon, title, description, onClick, disabled }) => (
    <div 
        onClick={!disabled ? onClick : null} 
        className={`p-6 rounded-2xl transition-all duration-300 transform ${
            disabled 
                ? 'bg-white/10 border border-white/20 cursor-not-allowed'
                : 'bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/30 hover:-translate-y-1 cursor-pointer'
        }`}
    > 
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
        {disabled && <div className="text-xs text-yellow-300 mt-3 font-semibold">Prossimamente</div>}
    </div>
);

const FormInput = ({ label, name, value, onChange, placeholder, type = "text" }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
            {label}
        </label>
        <input 
            type={type} 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
    </div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
            {label}
        </label>
        <textarea 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            rows={rows} 
            className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
    </div>
);

const FormSelect = ({ label, name, value, onChange, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
            {label}
        </label>
        <select 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
            {children}
        </select>
    </div>
);

const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (
    <button 
        type={type} 
        onClick={onClick} 
        className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${className}`} 
        {...props}
    >
        {children}
    </button>
);

const Modal = ({ show, onClose, children, size = 'lg' }) => {
    if (!show) return null;
    const sizeClasses = { lg: 'max-w-xl', xl: 'max-w-5xl', '2xl': 'max-w-7xl' };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div 
                className={`w-full ${sizeClasses[size]} bg-gray-800/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto`} 
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

// --- COMPONENTI FASCICOLO OPERATORE ---
const FascicoloOperatoreModal = ({ show, onClose, operatore, onUpdateFascicolo }) => {
    const [activeTab, setActiveTab] = useState('anagrafica');
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        indirizzo: '',
        codiceFiscale: '',
        dataNascita: ''
    });

    useEffect(() => {
        if (operatore) {
            setFormData({
                phone: operatore.phone || '',
                email: operatore.email || '',
                indirizzo: operatore.indirizzo || '',
                codiceFiscale: operatore.codiceFiscale || '',
                dataNascita: operatore.dataNascita || ''
            });
        }
    }, [operatore]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (file, type) => {
        setIsUploading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (type === 'attestati' || type === 'formazione') {
                const currentFiles = operatore.fascicolo?.[type] || [];
                await onUpdateFascicolo(operatore.id, { [type]: [...currentFiles, file.name] });
            } else {
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
                                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'curriculum')}
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

// --- CARD OPERATORE ---
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
        let total = 4;
        
        if (operatore.phone && operatore.email) completed++;
        if (operatore.fascicolo?.curriculum) completed++;
        if (operatore.fascicolo?.attestati?.length > 0) completed++;
        if (operatore.fascicolo?.formazione?.length > 0) completed++;
        
        return Math.round((completed / total) * 100);
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
                        <span className="text-xs text-white">{getCompletionPercentage()}%</span>
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

// --- OPERATORI ENHANCED ---
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
                        <p className="text-sm text-gray-400 mt-2">Totale operatori: {operators.length}</p>
                    </div>
                    <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                        ← Dashboard
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
                            <p className="text-sm text-gray-300">Operatori filtrati: <span className="font-bold text-white">{filteredOperators.length}</span></p>
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

// --- ALTRI MODULI SEMPLIFICATI ---
const Assistiti = ({ onNavigate }) => (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Elenco Assistiti</h2>
            <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                ← Dashboard
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ASSISTITI.map(assistito => (
                <div key={assistito.id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-cyan-800/50 rounded-full flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-cyan-200"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{assistito.first_name} {assistito.last_name}</h3>
                            <p className="text-sm text-gray-300">{assistito.address_street}</p>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400 border-t border-white/10 pt-3 mt-3">
                        <p>Fascicolo: <span className={assistito.fascicolo_completo ? 'text-green-400' : 'text-yellow-400'}>
                            {assistito.fascicolo_completo ? 'Compilato' : 'Da Compilare'}
                        </span></p>
                        <p>Diario: <span className="text-white">{assistito.diario_entries?.length || 0}</span> accessi</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const FascicoloSanitario = ({ onNavigate }) => (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Fascicolo Sanitario</h2>
            <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                ← Dashboard
            </Button>
        </div>
        <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Gestione Fascicoli Sanitari</h3>
            <p className="text-gray-300">Modulo in sviluppo per la gestione dei fascicoli sanitari degli assistiti.</p>
        </div>
    </div>
);

const DiarioAssistenziale = ({ onNavigate }) => (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Diario Assistenziale</h2>
            <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                ← Dashboard
            </Button>
        </div>
        <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Registrazione Interventi</h3>
            <p className="text-gray-300">Modulo in sviluppo per la registrazione degli interventi assistenziali.</p>
        </div>
    </div>
);

const Documentazione = ({ onNavigate }) => (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Documentazione</h2>
            <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                ← Dashboard
            </Button>
        </div>
        <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
            {MOCK_DOCUMENTS.map(doc => (
                <div key={doc.id} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                            <FileTextIcon className="w-6 h-6 text-gray-300"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{doc.title}</h3>
                            <p className="text-sm text-gray-400">Versione: {doc.version} - Tipo: {doc.type}</p>
                        </div>
                    </div>
                    <Button className="bg-white/10 hover:bg-white/20 text-sm">
                        Visualizza
                    </Button>
                </div>
            ))}
        </div>
    </div>
);

const Formazione = ({ onNavigate }) => (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Formazione</h2>
            <Button onClick={() => onNavigate('dashboard')} className="bg-white/10 hover:bg-white/20">
                ← Dashboard
            </Button>
        </div>
        <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Modulo Formazione</h3>
            <p className="text-gray-300">Materiale formativo e corsi per operatori. Prossimamente disponibile.</p>
        </div>
    </div>
);

// --- DASHBOARD ---
const Dashboard = ({ onNavigate }) => {
    const modules = [
        { id: 'assistiti', title: 'Assistiti', description: 'Crea e gestisci l\'anagrafica degli assistiti.', icon: <UserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'fascicolo-hub', title: 'Fascicolo Sanitario', description: 'Compila i dati clinici degli assistiti.', icon: <FileTextIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'diario-hub', title: 'Diario Assistenziale', description: 'Registra gli accessi e le attività giornaliere.', icon: <BookUserIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'operatori', title: 'Operatori', description: 'Anagrafica e fascicoli del personale SOGEENP.', icon: <StethoscopeIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'documentazione', title: 'Documentazione', description: 'Carica e consulta i documenti.', icon: <FolderUpIcon className="w-6 h-6 text-cyan-300"/>, disabled: false },
        { id: 'formazione', title: 'Formazione', description: 'Materiale formativo e corsi per operatori.', icon: <GraduationCapIcon className="w-6 h-6 text-cyan-300"/>, disabled: true },
        { id: 'rischio', title: 'Rischio Clinico', description: 'Gestione e monitoraggio del rischio clinico.', icon: <ShieldAlertIcon className="w-6 h-6 text-cyan-300"/>, disabled: true }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-4">Centrale Operativa Cure Domiciliari</h1>
                <p className="text-xl text-gray-300">Pannello di controllo per la gestione integrata dell'assistenza SOGEENP.</p>
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

// --- APP PRINCIPALE ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [operators, setOperators] = useState(OPERATORI_SOGEENP);

    const handleNavigation = (page) => {
        setCurrentPage(page);
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

    const renderPage = () => {
        switch (currentPage) {
            case 'assistiti': 
                return <Assistiti onNavigate={handleNavigation} />;
            case 'fascicolo-hub': 
                return <FascicoloSanitario onNavigate={handleNavigation} />;
            case 'diario-hub': 
                return <DiarioAssistenziale onNavigate={handleNavigation} />;
            case 'operatori': 
                return (
                    <OperatoriEnhanced 
                        onNavigate={handleNavigation} 
                        operators={operators} 
                        onUpdateOperatoreFascicolo={handleUpdateOperatoreFascicolo}
                    />
                );
            case 'documentazione': 
                return <Documentazione onNavigate={handleNavigation} />;
            case 'formazione': 
                return <Formazione onNavigate={handleNavigation} />;
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
