export const category = [
    {
        // Icono: Relacionado con ingeniería, arquitectura, o construcción general
        icon:'tool', // Sugerencia para construcción. Si no existe, puedes usar 'tool' o 'compass'
        title1:'Construcción',
        title2:'Civil',
        jobs:'150 Proveedores'
    },
    {
        // Icono: Relacionado con agricultura, plantas, o cosechas
        icon:'fridge-industrial', // Sugerencia para agroindustria. Si no existe, puedes usar 'seedling' o 'tractor'
        title1:'Agroindustria',
        title2:'& Agrícola',
        jobs:'90 Proveedores'
    },
    {
        // Icono: Relacionado con minería, roca, o maquinaria pesada
        icon:'layers', // Sugerencia para minería. Si no existe, puedes usar 'mountain' o 'mine'
        title1:'Minería',
        title2:'Extractiva',
        jobs:'80 Proveedores'
    },
    {
        // Icono: Relacionado con electricidad, fontanería, o sistemas
        icon:'zap', // Sugerencia para instalaciones. Si no existe, puedes usar 'pipe' o 'power'
        title1:'Instalaciones',
        title2:'Especiales',
        jobs:'60 Proveedores'
    },
    {
        // Icono: Relacionado con maquinaria, camiones o vehículos grandes
        icon:'truck', // Sugerencia para equipamiento pesado. Si no existe, puedes usar 'crane'
        title1:'Equipamiento',
        title2:'Pesado',
        jobs:'70 Proveedores'
    },
    {
        // Icono: Relacionado con materiales, ladrillos, o cemento
        icon:'package', // Sugerencia para materiales de obra. Si no existe, puedes usar 'box' o 'warehouse'
        title1:'Materiales',
        title2:'de Obra',
        jobs:'100 Proveedores'
    },
    {
        // Icono: Relacionado con planificación, documentos, o asesoría
        icon:'briefcase', // Sugerencia para consultoría. Si no existe, puedes usar 'file-text'
        title1:'Consultoría',
        title2:'Técnica',
        jobs:'50 Proveedores'
    },
    {
        // Icono: Relacionado con planos, desarrollo, o progreso
        icon:'trending-up', // Sugerencia para desarrollo de proyectos. Si no existe, puedes usar 'settings'
        title1:'Desarrollo',
        title2:'de Proyectos',
        jobs:'75 Proveedores'
    },
    {
        // Icono: Relacionado con reciclaje, basura, o sostenibilidad
        icon:'trash-2', // Sugerencia para gestión de residuos. Si no existe, puedes usar 'recycle'
        title1:'Gestión de',
        title2:'Residuos',
        jobs:'40 Proveedores'
    },
    {
        // Icono: Relacionado con escudo, seguridad, o protección
        icon:'shield', // Sugerencia para seguridad industrial. Si no existe, puedes usar 'lock' o 'hard-hat'
        title1:'Seguridad',
        title2:'Industrial',
        jobs:'45 Proveedores'
    },
];

export const jobData = [
    {
        id:1,
        image:'/assets/images/company/constructura_andes-logo.png', // Logo de una constructora (ejemplo)
        name:'Constructora Andes',
        posted:'2 días atrás', // Ajuste a español
        jobType:'Contrato de Proyecto', // Nueva modalidad
        title:'Movimiento de Tierras (Fase I)', // Servicio requerido
        location:'Lima, Perú', // Ubicación en Perú
        applied: 5, // Propuestas recibidas
        vacancy: 15, // Propuestas esperadas
        salary:'A cotizar', // O 'Presupuesto: S/50K-80K' si hay un rango
        desc:'Requerimos empresa especializada en movimiento de tierras para proyecto habitacional en Lima Metropolitana.'
    },
    {
        id:2,
        image:'/assets/images/company/agrocorp-logo.png', // Logo de una empresa agrícola
        name:'Agro Corp ',
        posted:'3 días atrás',
        jobType:'Servicio Puntual', // Nueva modalidad
        title:'Instalación de Sistema de Riego Tecnificado',
        location:'Ica, Perú',
        applied: 12,
        vacancy: 20,
        salary:'A cotizar',
        desc:'Buscamos proveedor para diseño e implementación de riego por goteo en campo de cultivo de 10 hectáreas.'
    },
    {
        id:3,
        image:'/assets/images/company/minera-aurum-logo.png', // Logo de una minera
        name:'Minera Aurum .',
        posted:'4 días atrás',
        jobType:'Colaboración a Largo Plazo',
        title:'Mantenimiento de Maquinaria Pesada',
        location:'Moquegua, Perú',
        applied: 8,
        vacancy: 10,
        salary:'A cotizar',
        desc:'Se requiere empresa para mantenimiento preventivo y correctivo de flota de cargadores frontales y excavadoras.'
    },
    {
        id:4,
        image:'/assets/images/company/inmobiliaria-futura.png', // Logo de una inmobiliaria
        name:'Inmobiliaria Futura EIRL',
        posted:'1 semana atrás',
        jobType:'Presencial', // Modalidad de trabajo
        title:'Instalación Eléctrica Integral (Edificio)',
        location:'Arequipa, Perú',
        applied: 15,
        vacancy: 25,
        salary:'A cotizar',
        desc:'Necesitamos electricistas certificados para la instalación de todo el sistema eléctrico de edificio multifamiliar.'
    },
    {
        id:5,
        image:'/assets/images/company/alimentos-andinos.png', // Logo de una empresa de alimentos
        name:'Alimentos Andinos S.R.L.',
        posted:'1 semana atrás',
        jobType:'Remoto',
        title:'Consultoría en Certificación Orgánica',
        location:'Cusco, Perú',
        applied: 25,
        vacancy: 30,
        salary:'A cotizar',
        desc:'Asesoría para obtener la certificación orgánica de nuestros productos agrícolas para exportación.'
    },
    {
        id:6,
        image:'/assets/images/company/geoingenieros-logo.png', // Logo de una empresa de ingeniería
        name:'GeoIngenieros Perú',
        posted:'2 semanas atrás',
        jobType:'Por Contrato',
        title:'Estudio de Suelos para Proyecto Vial',
        location:'Ancash, Perú',
        applied: 10,
        vacancy: 15,
        salary:'A cotizar',
        desc:'Solicitamos empresa especializada en estudios geotécnicos para carretera en zona rural.'
    },
    {
        id:7,
        image:'/assets/images/company/metalurgica-central.png', // Logo de una metalúrgica
        name:'Metalúrgica Central SAC',
        posted:'3 semanas atrás',
        jobType:'Tiempo Completo', // O 'Proyecto Dedicado'
        title:'Fabricación y Montaje de Estructuras Metálicas',
        location:'Callao, Perú',
        applied: 7,
        vacancy: 10,
        salary:'A cotizar',
        desc:'Buscamos empresa con experiencia en estructuras de acero para nave industrial.'
    },
    {
        id:8,
        image:'/assets/images/company/desarrollos-urbanos.png', // Logo de desarrollo urbano
        name:'Desarrollos Urbanos SA',
        posted:'1 mes atrás',
        jobType:'Servicio Puntual',
        title:'Topografía de Lotes Urbanos',
        location:'Piura, Perú',
        applied: 18,
        vacancy: 20,
        salary:'A cotizar',
        desc:'Requerimos servicios topográficos para levantamiento de planos de nuevo desarrollo urbanístico.'
    },
    {
        id:9,
        image:'/assets/images/company/construye-mas.png', // Otro logo de construcción
        name:'ConstruyeMás E.I.R.L.',
        posted:'1 mes atrás',
        jobType:'Presencial',
        title:'Suministro e Instalación de Drywall',
        location:'La Libertad, Perú',
        applied: 10,
        vacancy: 12,
        salary:'A cotizar',
        desc:'Proveedor de drywall y servicio de instalación para proyecto de oficinas comerciales.'
    },
    {
        id:10,
        image:'/assets/images/company/agro-export.png', // Logo de agro exportación
        name:'AgroExportaciones Perú',
        posted:'2 meses atrás',
        jobType:'Proyecto Remoto',
        title:'Consultoría en Exportación de Frutas',
        location:'Lima, Perú',
        applied: 22,
        vacancy: 25,
        salary:'A cotizar',
        desc:'Asesoría especializada en logística y normativa para la exportación de productos agrícolas.'
    },
    // Puedes añadir más ejemplos aquí siguiendo la misma estructura
];

export const featureData = [
    {
        icon:'phone',
        title:'Soporte 24/7',
        decs:'Tu operación no se detiene. Procura te brinda soporte constante para resolver tus dudas rápidamente.' // Antes: "Many desktop publishing now use and a search for job."
    },
    {
        icon:'cpu', // Considera 'mdi-handshake' o 'mdi-lightbulb-on-outline' para una conexión estratégica
        title:'Conexiones Estratégicas',
        decs:'Encuentra contactos clave. Conecta eficientemente con proveedores y empresas en todo el mercado peruano.' // Antes: "Many desktop publishing now use and a search for job."
    },
    {
        icon:'activity',
        title:'Rápido y Fácil',
        decs:'Tu tiempo es oro. Publica requerimientos o busca servicios de forma intuitiva y ágil.' // Antes: "Many desktop publishing now use and a search for job."
    },
    {
        icon:'clock',
        title:'Ahorra Tiempo y Recursos',
        decs:'Optimiza tus procesos. Simplifica la contratación y reduce significativamente tus costos operativos.' // Antes: "Many desktop publishing now use and a search for job."
    },
];

export const companyData = [
    {
        id:1,
        image:'/assets/images/company/constructura_andes-logo.png',
        name:'Constructora Andes',
        desc:'Expertos en movimiento de tierras y proyectos habitacionales en Perú.',
        loction:'Lima, Perú', // Propiedad original mantenida
        jobs: 8 // Antes 'activeServices', ahora 'jobs' con conteo de servicios/proyectos activos
    },
    {
        id:2,
        image:'/assets/images/company/agrocorp-logo.png',
        name:'Agro Corp',
        desc:'Soluciones en sistemas de riego tecnificado y agrotecnología para el agro peruano.',
        loction:'Ica, Perú',
        jobs: 5
    },
    {
        id:3,
        image:'/assets/images/company/minera-aurum-logo.png',
        name:'Minera Aurum',
        desc:'Líderes en mantenimiento de maquinaria pesada y soluciones mineras en el sur del Perú.',
        loction:'Moquegua, Perú',
        jobs: 7
    },
    {
        id:4,
        image:'/assets/images/company/inmobiliaria-futura.png',
        name:'Inmobiliaria Futura EIRL',
        desc:'Desarrollo de proyectos inmobiliarios y expertos en instalaciones eléctricas integrales.',
        loction:'Arequipa, Perú',
        jobs: 6
    },
    {
        id:5,
        image:'/assets/images/company/alimentos-andinos.png',
        name:'Alimentos Andinos S.R.L.',
        desc:'Consultoría en certificación orgánica y exportación de productos agrícolas andinos.',
        loction:'Cusco, Perú',
        jobs: 4
    },
    {
        id:6,
        image:'/assets/images/company/geoingenieros-logo.png',
        name:'GeoIngenieros Perú',
        desc:'Especialistas en estudios geotécnicos y soluciones de ingeniería para proyectos viales.',
        loction:'Ancash, Perú',
        jobs: 5
    },
    {
        id:7,
        image:'/assets/images/company/metalurgica-central.png',
        name:'Metalúrgica Central SAC',
        desc:'Fabricación y montaje de estructuras metálicas para la industria y construcción.',
        loction:'Callao, Perú',
        jobs: 9
    },
    {
        id:8,
        image:'/assets/images/company/desarrollos-urbanos.png',
        name:'Desarrollos Urbanos SA',
        desc:'Topografía de precisión y planificación para el desarrollo de lotes y áreas urbanas.',
        loction:'Piura, Perú',
        jobs: 4
    },
    {
        id:9,
        image:'/assets/images/company/construye-mas.png',
        name:'ConstruyeMás E.I.R.L.',
        desc:'Suministro e instalación de drywall y acabados para proyectos comerciales y residenciales.',
        loction:'La Libertad, Perú',
        jobs: 6
    },
    {
        id:10,
        image:'/assets/images/company/agro-export.png',
        name:'AgroExportaciones Perú',
        desc:'Asesoría y gestión logística para la exportación de frutas y productos agrícolas peruanos.',
        loction:'Lima, Perú',
        jobs: 5
    },
];

export const blogData = [
    {
        id:1,
        image:'/assets/images/blog/01.jpg', // Mantener si son imágenes genéricas de blog, o adaptar a fotos de proyectos/industrias.
        tag:'Construcción', // Cambiado de 'Arts'
        date:'13 de Septiembre 2025', // Fecha adaptada a español
        title:'11 Estrategias para Captar Nuevos Proyectos en Construcción Civil', // Título relevante
        company:'Equipo Procura' // Autor adaptado
    },
    {
        id:2,
        image:'/assets/images/blog/02.jpg',
        tag:'Agroindustria', // Cambiado de 'Illustration'
        date:'29 de Noviembre 2025',
        title:'Innovación Sostenible: El Futuro de la Agroindustria Peruana', // Título relevante
        company:'Análisis Procura' // Autor adaptado
    },
    {
        id:3,
        image:'/assets/images/blog/03.jpg',
        tag:'Minería', // Cambiado de 'Music'
        date:'29 de Diciembre 2025',
        title:'Optimización de Procesos: Claves para la Minería Extractiva del Mañana', // Título relevante
        company:'Expertos Procura' // Autor adaptado
    },
    {
        id:4,
        image:'/assets/images/blog/04.jpg',
        tag:'Logística', // Nueva categoría relevante
        date:'13 de Marzo 2025',
        title:'Logística para Proyectos Grandes: Retos y Soluciones en Perú', // Nuevo título
        company:'Procura Insights' // Nuevo autor
    },
    {
        id:5,
        image:'/assets/images/blog/05.jpg',
        tag:'Gestión de Proyectos', // Nueva categoría
        date:'5 de Mayo 2025',
        title:'Claves para una Gestión Exitosa de Proyectos de Infraestructura', // Nuevo título
        company:'Equipo Procura'
    },
    {
        id:6,
        image:'/assets/images/blog/06.jpg',
        tag:'Medio Ambiente', // Nueva categoría
        date:'19 de Junio 2025',
        title:'Impacto Ambiental en la Construcción: Prácticas Sostenibles', // Nuevo título
        company:'Análisis Procura'
    },
    {
        id:7,
        image:'/assets/images/blog/07.jpg',
        tag:'Tecnología', // Nueva categoría
        date:'20 de Junio 2025',
        title:'Tecnología BIM: Transformando la Construcción en el Perú', // Nuevo título
        company:'Expertos Procura'
    },
    {
        id:8,
        image:'/assets/images/blog/08.jpg',
        tag:'Regulación', // Nueva categoría
        date:'31 de Agosto 2025',
        title:'Nuevas Regulaciones para el Sector Minero: Lo que Debes Saber', // Nuevo título
        company:'Procura Insights'
    },
    {
        id:9,
        image:'/assets/images/blog/09.jpg',
        tag:'Maquinaria Pesada', // Nueva categoría
        date:'1 de Septiembre 2025',
        title:'Mantenimiento de Maquinaria Pesada: Maximizando la Vida Útil', // Nuevo título
        company:'Equipo Procura'
    },
]

export const servicesData = [
    {
        image:'/assets/images/work/01.jpg',
        title:'Product & Branding Design'
    },
    {
        image:'/assets/images/work/02.jpg',
        title:'Wordpress Development'
    },
    {
        image:'/assets/images/work/03.jpg',
        title:'Audio & Video Editing'
    },
    {
        image:'/assets/images/work/04.jpg',
        title:'Admin & Customer Support'
    },
    {
        image:'/assets/images/work/05.jpg',
        title:'UX / UI Designer'
    },
    {
        image:'/assets/images/work/06.jpg',
        title:'Digital Marketing'
    },
]

export const categoryTwo = [
    {
        title:'Human Resource',
        job:'90 Jobs Available'
    },
    {
        title:'It & Networking',
        job:'90 Jobs Available'
    },
    {
        title:'Sales & Marketing',
        job:'90 Jobs Available'
    },
    {
        title:'Accounting',
        job:'90 Jobs Available'
    },
    {
        title:'Delivery Boy',
        job:'90 Jobs Available'
    },
    {
        title:'Data Science',
        job:'90 Jobs Available'
    },
    {
        title:'Project Manager',
        job:'90 Jobs Available'
    },
    {
        title:'Engineering',
        job:'90 Jobs Available'
    },
    {
        title:'Help Center',
        job:'90 Jobs Available'
    },
    {
        title:'Full Stack Developer',
        job:'90 Jobs Available'
    },
]

export const faqData = [
    {
        id:1,
        title:'¿Cómo funciona Procura para empresas y proveedores?',
        desc:'Procura conecta a empresas que buscan servicios especializados con proveedores calificados en los sectores de construcción, agroindustria y minería. Las empresas publican sus requerimientos o buscan proveedores directamente, y los proveedores crean sus perfiles y ofertan sus servicios.'
    },
    {
        id:2,
        title:'¿Necesito conocimientos técnicos avanzados para usar Procura?',
        desc:'No. Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, tanto para empresas que publican proyectos como para proveedores que gestionan sus ofertas. Ofrecemos una interfaz amigable que no requiere conocimientos técnicos avanzados.'
    },
    {
        id:3,
        title:'¿Qué necesito para empezar a ofrecer mis servicios en Procura?',
        desc:'Para empezar a ofrecer tus servicios, solo necesitas registrarte como proveedor, completar tu perfil con tus especialidades (construcción, agroindustria, minería, etc.), subir tu portafolio y certificaciones. Una vez aprobado, podrás postular a proyectos y ser encontrado por empresas.'
    },
    {
        id:4,
        title:'¿Qué sucede cuando una empresa o proveedor encuentra una coincidencia?',
        desc:'Cuando una empresa encuentra un proveedor adecuado o un proveedor es seleccionado para un proyecto, nuestra plataforma facilita la comunicación directa para que puedan negociar los detalles, compartir documentos y formalizar el acuerdo de servicio. Procura es el punto de conexión inicial.'
    },
]
export const candidateData = [
    {
        id: 1,
        image: '/assets/images/team/1.jpg',
        name: 'Soluciones Integrales Andinas SAC',
        position: 'Servicios de Ingeniería Civil',
        feature: ['Topografía', 'Supervisión', 'Obra Civil', 'Planificación'],
        salary: 'S/18,000 - S/22,000',
        experience: '4 años',
        rate: true
    },
    {
        id: 2,
        image: '/assets/images/team/2.jpg',
        name: 'Tech Innovadores del Perú SRL',
        position: 'Desarrollo de Software a medida',
        feature: ['Frontend', 'Backend', 'UX/UI', 'QA'],
        salary: 'S/16,000 - S/20,000',
        experience: '3 años',
        rate: false
    },
    {
        id: 3,
        image: '/assets/images/team/3.jpg',
        name: 'Energía Renovable del Sur EIRL',
        position: 'Instalación de paneles solares',
        feature: ['Electricidad', 'Energía', 'Sostenibilidad', 'Instalación'],
        salary: 'S/12,000 - S/15,000',
        experience: '5 años',
        rate: true
    },
    {
        id: 4,
        image: '/assets/images/team/4.jpg',
        name: 'Constructora Norte Andino SAC',
        position: 'Construcción de vivienda multifamiliar',
        feature: ['Arquitectura', 'Diseño', 'Construcción', 'Logística'],
        salary: 'S/20,000 - S/25,000',
        experience: '6 años',
        rate: true
    },
    {
        id: 5,
        image: '/assets/images/team/5.jpg',
        name: 'Comercializadora Digital Lima SAC',
        position: 'Marketing Digital y Branding',
        feature: ['SEO', 'Publicidad', 'Social Media', 'Diseño Web'],
        salary: 'S/10,000 - S/12,000',
        experience: '2 años',
        rate: false
    },
    {
        id: 6,
        image: '/assets/images/team/6.jpg',
        name: 'Grupo Inmobiplus Perú',
        position: 'Gestión Inmobiliaria',
        feature: ['Proyectos', 'Venta', 'Asesoría', 'Diseño'],
        salary: 'S/15,000 - S/18,000',
        experience: '4 años',
        rate: false
    },
    {
        id: 7,
        image: '/assets/images/team/7.jpg',
        name: 'Red Logística del Pacífico SAC',
        position: 'Servicios de Transporte y Almacén',
        feature: ['Transporte', 'Almacén', 'Distribución', 'Ruteo'],
        salary: 'S/11,000 - S/14,000',
        experience: '5 años',
        rate: true
    },
    {
        id: 8,
        image: '/assets/images/team/8.jpg',
        name: 'Servicios Generales Qhapaq Ñan EIRL',
        position: 'Mantenimiento industrial y limpieza',
        feature: ['Electricidad', 'Gasfitería', 'Pintura', 'Aseo'],
        salary: 'S/8,000 - S/9,500',
        experience: '3 años',
        rate: true
    },
    {
        id: 9,
        image: '/assets/images/team/1.jpg',
        name: 'Andes Proyectos SAC',
        position: 'Consultoría en proyectos públicos',
        feature: ['SNIP', 'Invierte.pe', 'Expedientes Técnicos', 'Supervisión'],
        salary: 'S/18,000 - S/21,000',
        experience: '7 años',
        rate: true
    },
    {
        id: 10,
        image: '/assets/images/team/2.jpg',
        name: 'AgroTech Valle Verde SRL',
        position: 'Automatización agrícola',
        feature: ['Riego tecnificado', 'Sensores', 'Software', 'Monitoreo'],
        salary: 'S/13,000 - S/16,000',
        experience: '3 años',
        rate: false
    },
    {
        id: 11,
        image: '/assets/images/team/3.jpg',
        name: 'Legal & Financiera Andina SAC',
        position: 'Asesoría legal y financiera para MYPES',
        feature: ['Tributación', 'Contratos', 'Créditos', 'Formalización'],
        salary: 'S/6,000 - S/8,000',
        experience: '4 años',
        rate: false
    },
    {
        id: 12,
        image: '/assets/images/team/4.jpg',
        name: 'Digitaliza Perú SAC',
        position: 'Transformación digital para empresas',
        feature: ['CRM', 'ERP', 'Digitalización', 'Capacitación'],
        salary: 'S/14,000 - S/17,000',
        experience: '3 años',
        rate: true
    },
];


export const aboutData = [
    {
        icon:'phone',
        title:'Soporte 24/7',
        desc:'Nuestro equipo está disponible para ayudarte en cualquier momento del día.'
    },
    {
        icon:'cpu',
        title:'Tecnología e Industria',
        desc:'Conectamos empresas con proveedores especializados en múltiples sectores industriales.'
    },
    {
        icon:'activity',
        title:'Rápido y Sencillo',
        desc:'Publica tus requerimientos o postula a proyectos en cuestión de minutos.'
    },
    {
        icon:'clock',
        title:'Ahorra Tiempo',
        desc:'Encuentra al proveedor ideal sin largas búsquedas ni procesos complicados.'
    },
    {
        icon:'file-text',
        title:'Postula con Confianza',
        desc:'Perfiles verificados y requerimientos detallados para decisiones más seguras.'
    },
    {
        icon:'codesandbox',
        title:'Proceso Transparente',
        desc:'Gestiona ofertas y proyectos con total visibilidad del proceso de selección.'
    },
    {
        icon:'users',
        title:'Empresas Activas',
        desc:'Red de empresas que buscan activamente proveedores calificados en Perú.'
    },
    {
        icon:'user-check',
        title:'Sin Oportunidades Perdidas',
        desc:'Recibe notificaciones de proyectos que coinciden con tu especialidad.'
    },
]

export const teamData = [
    {
        image:'assets/images/team/04.jpg',
        social:['facebook','instagram','twitter'],
        name:'Carlos Mendoza',
        position:'Proveedor de Servicios'
    },
    {
        image:'assets/images/team/05.jpg',
        social:['facebook','instagram','twitter'],
        name:'Ana Torres',
        position:'Gestora de Proyectos'
    },
    {
        image:'assets/images/team/06.jpg',
        social:['facebook','instagram','twitter'],
        name:'Luis Paredes',
        position:'Especialista en Minería'
    },
    {
        image:'assets/images/team/07.jpg',
        social:['facebook','instagram','twitter'],
        name:'María Quispe',
        position:'Consultora de Negocios'
    },
]

export const guidesData = [
    {
        title:'Getting started',
        feature:[
            'Deciding to purchase',
            'List your space',
            'Landing an experience or adventure',
            'Top uses questions'
        ]
    },
    {
        title:'Your calendar',
        feature:[
            'Pricing & availability',
            'Booking settings',
            'Responding to enquiries & requests',
            'Snoozing or deactivating your listing'
        ]
    },
    {
        title:'Your listings',
        feature:[
            'Updating your listing',
            'Neighbourhoods',
            'Listing photos & photography',
            'Jobnova Plus',
            'API-connected software'
        ]
    },
    {
        title:'How payouts work',
        feature:[
            'Getting paid',
            'Adding payout info',
            'Your payout status',
            'Donations',
            'Taxes'
        ]
    },
    {
        title:'Your reservations',
        feature:[
            'Jobnova safely',
            'Jobnova Experiences and Adventures',
            'Changing a reservation',
            'Cancelling a reservat',
            'Long-term reservations'
        ]
    },
    {
        title:'Reservation help',
        feature:[
            'Help with a reservation or guest',
            'Guest cancellations',
        ]
    },
    {
        title:'Your account',
        feature:[
            'Your profile',
            'Account security',
            'Identification & verifications',
            'Reviews',
            'Superhost status'
        ]
    },
]
