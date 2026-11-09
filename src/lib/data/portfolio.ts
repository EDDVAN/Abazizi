export const portfolio = {
	name: 'Ali Bazizi',
	title: 'Full Stack Developer',
	secondaryTitle: 'Software Engineer',
	location: 'Casablanca, Morocco',
	email: 'bazizi.ali0@gmail.com',
	phone: '+212 635-259217',
	phoneHref: 'tel:+212635259217',
	resume: 'documents/ali-bazizi-resume.pdf',
	github: 'https://github.com/EDDVAN/',
	linkedin: 'https://www.linkedin.com/in/ali-bazizi-b74668224/',
	source: 'https://abazizi.vercel.app/',
	introduction:
		'I turn complex requirements into clear, useful web experiences. From the first conversation to the final deployment.',
	summary:
		'I’m a Moroccan software engineer specializing in full stack web development. My work spans SaaS products and tailored solutions—connecting thoughtful interfaces, dependable backends, and the data that makes them work.',
	approach:
		'I work across the whole development process: understanding a client’s needs, finding a simple and powerful solution, then bringing it through design, implementation, deployment, and maintenance.',
	languages: [
		{ name: 'Arabic', level: 'Native' },
		{ name: 'English', level: 'Fluent · C2 level' },
		{ name: 'French', level: 'Proficient' }
	],
	work: [
		{
			id: 'archiving',
			number: '01',
			category: 'PROFESSIONAL CONTRIBUTION',
			name: 'Centralized document archiving',
			description:
				'A centralized document archiving system built to work with complex legacy systems. Developed as part of my work at BAYANE SOLUTION.',
			context: 'BAYANE SOLUTION',
			type: 'Document systems',
			visual: 'archive'
		},
		{
			id: 'shell',
			number: '02',
			category: '42 NETWORK / LEARNING PROJECT',
			name: 'Fully functional Unix shell',
			description:
				'A fully functional Unix shell, developed within the peer-learning environment of 1337 Coding School.',
			context: '1337 Coding School',
			type: 'Computer architecture',
			visual: 'shell'
		},
		{
			id: 'raycasting',
			number: '03',
			category: '42 NETWORK / LEARNING PROJECT',
			name: '3D raycasting game',
			description:
				'A 3D raycasting game—a Wolfenstein clone—created as part of my studies at 1337 Coding School.',
			context: '1337 Coding School',
			type: 'Raycasting study',
			visual: 'raycasting'
		}
	],
	experience: {
		company: 'BAYANE SOLUTION',
		role: 'Full Stack Developer',
		dates: '2022 — Present',
		summary: 'Building web-based management systems around the way people actually work.',
		responsibilities: [
			'Collaborated with clients to define needs and deliver effective, user-focused solutions.',
			'Led development across frontend, backend, databases, deployment, and maintenance.',
			'Built management systems for sales, finance, and project tracking.',
			'Delivered reusable, maintainable code across projects with different requirements.'
		],
		contributions: [
			'Optimized database queries, significantly reducing load times.',
			'Developed a centralized document archiving system compatible with complex legacy systems.'
		]
	},
	skills: [
		{
			name: 'Languages',
			annotation: 'THE FOUNDATIONS',
			items: ['JavaScript', 'TypeScript', 'PHP', 'C#', 'Java', 'SQL']
		},
		{
			name: 'Frontend',
			annotation: 'THE INTERFACE',
			items: ['React', 'Next.js', 'Svelte', 'SvelteKit', 'Vanilla JS', 'jQuery', 'HTMX']
		},
		{
			name: 'Backend',
			annotation: 'THE ENGINE',
			items: ['Node.js', 'Express', 'Spring Boot', 'ASP.NET MVC', 'PHP MVC', 'Laravel']
		},
		{
			name: 'Data',
			annotation: 'THE STRUCTURE',
			items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Prisma']
		},
		{
			name: 'Interface & tools',
			annotation: 'THE WORKBENCH',
			items: [
				'Tailwind CSS',
				'Bootstrap',
				'SCSS',
				'Git',
				'GraphQL',
				'Figma',
				'Postman',
				'Photoshop'
			]
		}
	],
	education: [
		{
			id: 'ensa',
			date: '2024 — 2025',
			title: 'Bachelor’s Degree',
			field: 'Computer Science',
			institution: 'ENSA Fes',
			description:
				'A one-year software-engineering program, with full stack development, Java mobile development, UML, databases, and Business Intelligence.'
		},
		{
			id: '1337',
			date: '2021 — 2023',
			title: '1337 — 42 Network',
			field: 'Computer Architecture',
			institution: '1337 Coding School',
			description:
				'A shift from traditional studies to peer learning. Advanced algorithms in C/C++, with projects ranging from a LibC equivalent to a fully working shell and a raycasting game.'
		},
		{
			id: 'istag',
			date: '2019 — 2021',
			title: 'Specialized Technician Diploma',
			field: 'Computer Science',
			institution: 'ISTAG Bab Tizimi, Meknes',
			description:
				'Graduated with honors. Foundations in algorithms, desktop, web and mobile development, databases, UML, and Boolean algebra.'
		},
		{
			id: 'school',
			date: '2019',
			title: 'High School',
			field: 'Physics & Chemistry',
			institution: '',
			description: 'Finished high school and began my studies in Computer Science.'
		},
		{
			id: 'learning',
			date: '2019 — Retirement',
			title: 'Self Learning',
			field: 'Web Development',
			institution: 'Independent learning',
			description:
				'An ongoing journey in web development. Challenging myself to learn something new, every day.'
		}
	]
} as const;
