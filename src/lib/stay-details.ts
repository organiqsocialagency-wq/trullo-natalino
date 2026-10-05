// Owner-provided information and photographs. Airbnb details are pending:
// the supplied listing returned “Abbiamo rimosso la pagina che stai cercando”.
export const comforts = [
  { icon: "kitchen", title: "Cucina attrezzata", detail: "Piano cottura, forno e microonde." },
  { icon: "climate", title: "Aria condizionata", detail: "Per ritrovare il fresco in casa." },
  { icon: "patio", title: "Patio all’aperto", detail: "Tavolo e ombrellone per le tue pause." },
  { icon: "laundry", title: "Lavatrice", detail: "Una comodità anche per soggiorni più lunghi." },
  { icon: "tv", title: "TV Samsung", detail: "Nel soggiorno, per una serata di relax." },
  { icon: "shower", title: "Bagno con doccia", detail: "Uno spazio dedicato alla cura di sé." },
] as const;

export type ComfortIconName = typeof comforts[number]["icon"];

export const stayFaqs = [
  { topic: "La casa", question: "La casa è tutta per noi?", answer: "Sì. Trullo Natalino è un’unica casa da prenotare interamente: gli ambienti sono a disposizione esclusiva del tuo soggiorno." },
  { topic: "Gli spazi", question: "Quali ambienti troveremo?", answer: "La camera matrimoniale, il soggiorno, la cucina con il camino in pietra e il bagno con doccia. All’esterno, il patio con tavolo e ombrellone invita a vivere le giornate con calma." },
  { topic: "A tavola", question: "Possiamo cucinare in casa?", answer: "Sì, la casa dispone di una cucina attrezzata con piano cottura, forno e microonde: puoi organizzare i pasti secondo i tuoi ritmi." },
  { topic: "Le comodità", question: "Quali comfort sono disponibili?", answer: "Troverai aria condizionata, lavatrice e una TV Samsung in soggiorno. La casa unisce il carattere della pietra alle piccole comodità di tutti i giorni." },
  { topic: "Come arrivare", question: "Dove si trova Trullo Natalino?", answer: "In Contrada Pentimone, 70010 Locorotondo BA, nella campagna della Valle d’Itria. Nella sezione prenotazioni trovi la mappa cliccabile con la posizione precisa e le indicazioni per raggiungerci." },
  { topic: "Il tuo soggiorno", question: "Come chiediamo disponibilità e tariffe?", answer: "Scegli le date e indica con chi viaggi nel modulo qui sotto: preparerà una richiesta su WhatsApp. Puoi anche chiamarci al +39 331 302 1588. Disponibilità e tariffe vengono confermate direttamente dal proprietario." },
] as const;
