const ObjectifSqueleton = () => {
	return (
		// The objective cards container
		<div className='bg-white dark:bg-ink-900 p-5 rounded-3xl border border-neutral-400 dark:border-white/10 flex flex-col justify-between'>
			<div>
				{/** The title of the card */}
				<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-20 mb-10'></div>
				{/** A grid to display each info */}
				<div className='lg:grid grid-cols-2 gap-10 pb-7'>
					{/** The first item display */}
					<div className='grid grid-cols-2 md:block items-center'>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-14'></div>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-20 mt-2'></div>
					</div>
					{/** The second item display */}
					<div className='grid grid-cols-2 md:block items-center'>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-14'></div>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-20 mt-2'></div>
					</div>
					{/** The third item display */}
					<div className='grid grid-cols-2 md:block items-center'>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-14'></div>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-20 mt-2'></div>
					</div>
					{/** The last item display */}
					<div className='grid grid-cols-2 md:block items-center'>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-14'></div>
						<div className='h-6 bg-gray-200 dark:bg-ink-800 animate-pulse rounded w-20 mt-2'></div>
					</div>
				</div>
			</div>
			{/** Button to change the objective */}
			<div className='h-10 bg-gray-200 dark:bg-ink-800 animate-pulse rounded'></div>
		</div>
	);
};

export default ObjectifSqueleton;
