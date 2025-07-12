<artifacts>
<artifact identifier="firebase-hook-file" type="application/vnd.ant.code" language="javascript" title="📁 src/hooks/useFirebase.js - Copia questo codice completo">
import { useState, useEffect } from 'react'
import { assistitiService, operatoriService, initializeFirebase } from '../services/firebase'
export const useFirebaseData = () => {
const [assistiti, setAssistiti] = useState([])
const [operatori, setOperatori] = useState([])
const [loading, setLoading] = useState(true)
const [connected, setConnected] = useState(false)
useEffect(() => {
initializeData()
}, [])
const initializeData = async () => {
try {
setLoading(true)
  const isConnected = await initializeFirebase()
  setConnected(isConnected)
  
  if (isConnected) {
    const [assistitiData, operatoriData] = await Promise.all([
      assistitiService.getAll(),
      operatoriService.getAll()
    ])
    
    setAssistiti(assistitiData)
    setOperatori(operatoriData)
    
    console.log('✅ Dati caricati da Firebase:', {
      assistiti: assistitiData.length,
      operatori: operatoriData.length
    })
  } else {
    // Fallback ai dati mock se Firebase non funziona
    const OPERATORI_SOGEENP = [
      { id: 1, full_name: "Dott.ssa Cecilia Matta", role: "Direttore", department: "Direzione", level: "Direzione", phone: "+39 011 123456", email: "c.matta@sogeenp.it", hire_date: "2020-01-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 2, full_name: "Federica Pastorino", role: "Vice-Direttore e RQ", department: "Direzione", level: "Direzione", phone: "+39 011 123457", email: "f.pastorino@sogeenp.it", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 3, full_name: "Lorenzo GRECU", role: "Direttore e Medico Responsabile", department: "Direzione", level: "Direzione", phone: "+39 011 123458", email: "l.grecu@sogeenp.it", hire_date: "2019-11-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 4, full_name: "Nadia Vuovolo", role: "Segreteria – Call Center", department: "Amministrazione", level: "Staff", phone: "+39 011 123459", email: "n.vuovolo@sogeenp.it", hire_date: "2021-02-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 5, full_name: "Pasquale Milena", role: "Coordinatore Infermieristico", department: "Assistenza", level: "Coordinamento", phone: "+39 011 123460", email: "p.milena@sogeenp.it", hire_date: "2020-06-01", note: "L.P.", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 6, full_name: "Cristina Bovone", role: "Case Manager", department: "Assistenza", level: "Coordinamento", phone: "+39 011 123461", email: "c.bovone@sogeenp.it", hire_date: "2021-01-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 7, full_name: "Matteo Vannucci", role: "Responsabile Formazione", department: "Formazione", level: "Staff", phone: "+39 011 123462", email: "m.vannucci@sogeenp.it", hire_date: "2021-09-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 8, full_name: "Ghita Dumitra", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "+39 011 123463", email: "g.dumitra@sogeenp.it", hire_date: "2021-03-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 9, full_name: "Sasu Roxana", role: "Infermiere", department: "Assistenza", level: "Operativo", note: "L.P.", phone: "+39 011 123464", email: "s.roxana@sogeenp.it", hire_date: "2021-04-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 10, full_name: "Andrea Corradini", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "+39 011 123465", email: "a.corradini@sogeenp.it", hire_date: "2020-10-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 11, full_name: "Emanuele Pisoni", role: "Fisioterapista", department: "Riabilitazione", level: "Operativo", note: "L.P.", phone: "+39 011 123466", email: "e.pisoni@sogeenp.it", hire_date: "2021-01-20", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 12, full_name: "Federica Pastorino", role: "Psicologa", department: "Assistenza", level: "Staff", phone: "+39 011 123467", email: "f.pastorino.psi@sogeenp.it", hire_date: "2020-03-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 13, full_name: "Ferrarotti Lucia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123468", email: "l.ferrarotti@sogeenp.it", hire_date: "2020-08-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 14, full_name: "Conzatti Anna", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123469", email: "a.conzatti@sogeenp.it", hire_date: "2020-09-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 15, full_name: "Tononi Sabrina", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123470", email: "s.tononi@sogeenp.it", hire_date: "2021-02-01", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 16, full_name: "Romano Anna Tiziana", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123471", email: "a.romano@sogeenp.it", hire_date: "2020-12-10", fascicolo: { curriculum: null, attestati: [], formazione: [] } },
      { id: 17, full_name: "Marella Eugenia", role: "OSS", department: "Assistenza", level: "Operativo", phone: "+39 011 123472", email: "e.marella@sogeenp.it", hire_date: "2021-05-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } }
    ]
    setOperatori(OPERATORI_SOGEENP)
    console.log('⚠️ Usando dati mock - Firebase non disponibile')
  }
} catch (error) {
  console.error('Errore inizializzazione:', error)
  // Fallback comunque ai dati mock
  const OPERATORI_SOGEENP = [
    { id: 1, full_name: "Dott.ssa Cecilia Matta", role: "Direttore", department: "Direzione", level: "Direzione", phone: "+39 011 123456", email: "c.matta@sogeenp.it", hire_date: "2020-01-15", fascicolo: { curriculum: null, attestati: [], formazione: [] } }
  ]
  setOperatori(OPERATORI_SOGEENP)
} finally {
  setLoading(false)
}
}
const addAssistito = async (assistitoData) => {
try {
const savedAssistito = await assistitiService.save(assistitoData)
setAssistiti(prev => [...prev, savedAssistito])
return savedAssistito
} catch (error) {
throw new Error('Errore salvataggio assistito: ' + error.message)
}
}
const updateFascicolo = async (assistitoId, fascicolo) => {
try {
await assistitiService.updateFascicolo(assistitoId, fascicolo)
setAssistiti(prev => prev.map(a =>
a.id === assistitoId ? { ...a, fascicolo } : a
))
} catch (error) {
throw new Error('Errore aggiornamento fascicolo: ' + error.message)
}
}
const addDiarioEntry = async (assistitoId, entry) => {
try {
const updatedEntries = await assistitiService.addDiarioEntry(assistitoId, entry)
setAssistiti(prev => prev.map(a =>
a.id === assistitoId ? { ...a, diario_entries: updatedEntries } : a
))
} catch (error) {
throw new Error('Errore aggiunta diario: ' + error.message)
}
}
const updateOperatoreFascicolo = async (operatoreId, fascicolo) => {
try {
await operatoriService.updateFascicolo(operatoreId, fascicolo)
setOperatori(prev => prev.map(op =>
op.id === operatoreId ? { ...op, fascicolo } : op
))
} catch (error) {
throw new Error('Errore aggiornamento fascicolo operatore: ' + error.message)
}
}
return {
assistiti,
operatori,
loading,
connected,
addAssistito,
updateFascicolo,
addDiarioEntry,
updateOperatoreFascicolo,
refresh: initializeData
}
}
</artifact>
</artifacts>
