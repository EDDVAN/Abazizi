<script>
	import { Layers, Star, AppWindow, Braces, Database, PocketKnife } from 'lucide-svelte';
	import React from './logos/react.svelte';
	import Svelte from './logos/svelte.svelte';
	import Nextjs from './logos/nextjs.svelte';
	import Tailwind from './logos/tailwind.svelte';
	import Bootstrap from './logos/bootstrap.svelte';
	import Scss from './logos/scss.svelte';
	import DotNet from './logos/dot-net.svelte';
	import Nodejs from './logos/nodejs.svelte';
	import Expressjs from './logos/expressjs.svelte';
	import Php from './logos/php.svelte';
	import Laravel from './logos/laravel.svelte';
	import Postgresql from './logos/postgresql.svelte';
	import Mysql from './logos/mysql.svelte';
	import Mongodb from './logos/mongodb.svelte';
	import Redis from './logos/redis.svelte';
	import Prisma from './logos/prisma.svelte';
	import Git from './logos/git.svelte';
	import Graphql from './logos/graphql.svelte';
	import Postman from './logos/postman.svelte';
	import Photoshop from './logos/photoshop.svelte';
	import Figma from './logos/figma.svelte';
</script>

<section
	class="flex md:flex-row flex-col md:h-screen sm:h-fit h-fit md:py-12 py-6 md:px-24 px-4 md:gap-12 gap-4"
	id="techstack"
>
	<div class="md:w-1/2 w-full md:h-full h-dvh flex flex-col p-6 gap-6 text-cream">
		<div class="flex flex-col justify-around h-1/6">
			<Layers class="w-8 h-8" />
			<h1 class="sm:text-7xl text-5xl font-header">Tech Stack</h1>
		</div>
		<div class="flex flex-col gap-4 flex-grow justify-between h-5/6">
			<h2 class="text-xl flex gap-2 items-center justify-center border-t-[1px] pt-4">
				<AppWindow class="w-6 h-6" /> Fontend
			</h2>
			<div class="w-full flex justify-between items-center fill-cream px-4">
				<React class="w-12 h-12 md:w-16 md:h-16" />
				<Nextjs class="w-12 h-12 md:w-16 md:h-16" />
				<Svelte class="w-12 h-12 md:w-16 md:h-16" />
				<Tailwind class="w-12 h-12 md:w-16 md:h-16" />
				<Bootstrap class="w-12 h-12 md:w-16 md:h-16" />
				<Scss class="w-12 h-12 md:w-16 md:h-16" />
			</div>
			<h2 class="text-xl flex gap-2 items-center justify-center border-t-[1px] pt-4">
				<Braces class="w-6 h-6" /> Backend
			</h2>
			<div class="w-full flex justify-between items-center fill-cream px-4">
				<Nodejs class="w-12 h-12 md:w-16 md:h-16" />
				<Expressjs class="w-12 h-12 md:w-16 md:h-16" />
				<DotNet class="w-12 h-12 md:w-16 md:h-16" />
				<Php class="w-12 h-12 md:w-16 md:h-16" />
				<Laravel class="w-12 h-12 md:w-16 md:h-16" />
			</div>
			<h2 class="text-xl flex gap-2 items-center justify-center border-t-[1px] pt-4">
				<Database class="w-6 h-6" /> Database
			</h2>
			<div class="w-full flex justify-between items-center fill-cream px-4">
				<Mysql class="w-12 h-12 md:w-16 md:h-16" />
				<Postgresql class="w-12 h-12 md:w-16 md:h-16" />
				<Mongodb class="w-12 h-12 md:w-16 md:h-16" />
				<Redis class="w-12 h-12 md:w-16 md:h-16" />
				<Prisma class="w-12 h-12 md:w-16 md:h-16" />
			</div>
			<h2 class="text-xl flex gap-2 items-center justify-center border-t-[1px] pt-4">
				<PocketKnife class="w-6 h-6" /> Other
			</h2>
			<div class="w-full flex justify-between items-center fill-cream px-4 border-b-[1px] pb-8">
				<Git class="w-12 h-12 md:w-16 md:h-16" />
				<Graphql class="w-12 h-12 md:w-16 md:h-16" />
				<Figma class="w-12 h-12 md:w-16 md:h-16" />
				<Postman class="w-12 h-12 md:w-16 md:h-16" />
				<Photoshop class="w-12 h-12 md:w-16 md:h-16" />
			</div>
		</div>
	</div>
	<div class="md:w-1/2 w-full md:h-full h-fit flex flex-col p-6 gap-6 text-darkvariant bg-cream">
		<div class="flex flex-col justify-around h-1/6">
			<Star class="w-8 h-8 flex-shrink-0" />
			<h1 class="md:text-7xl sm:text-5xl text-5xl font-header">Experience</h1>
		</div>
		<div class="flex flex-col gap-4 h-fit flex-grow justify-between">
			<div class="w-full border-2 flex flex-col gap-2 p-4 border-darkvariant rounded-md xs:text-xs">
				<h2 class="text-xl flex gap-2 items-center text-header font-semibold">
					Conceptualizing the Project
				</h2>
				<p>
					A large part of my experience is the conceptualization of the project. Understanding the
					clients needs, and figuring a simple and powerful solution.
				</p>
			</div>
			<div class="w-full border-2 flex flex-col gap-2 p-4 border-darkvariant rounded-md xs:text-xs">
				<h2 class="text-xl flex gap-2 items-center text-header font-semibold">
					Frontend, Backend, Database and Deployment
				</h2>
				<p>
					As a fullstack developer, I have experience with frontend, backend and database. I took
					part of every part of the development process, from the design, during the implementation,
					up to the deployment and maintenance.
				</p>
			</div>
			<div class="w-full border-2 flex flex-col gap-2 p-4 border-darkvariant rounded-md xs:text-xs">
				<h2 class="text-xl flex gap-2 items-center text-header font-semibold">Industries</h2>
				<p>
					The majority of the projects I have worked on were management systems for various
					industries, from sales, project management, finance, etc. The products I took part on were
					mostly web applications, offering a platform for the clients to manage every part of thier
					workflow.
				</p>
			</div>
			<div class="w-full border-2 flex flex-col gap-2 p-4 border-darkvariant rounded-md xs:text-xs">
				<h2 class="text-xl flex gap-2 items-center text-header font-semibold">
					Custom work and adaptability
				</h2>
				<p>
					In my time working in different projects, I have been able to adapt to different
					requirements, this pushed me towards a more general approach, that maximizes the usability
					of the code while reducing technical debt.
				</p>
			</div>
		</div>
	</div>
</section>
