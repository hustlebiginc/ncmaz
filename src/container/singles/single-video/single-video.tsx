import React, { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostMeta2 from '@/components/PostMeta2/PostMeta2'
import { SingleType1Props } from '../single/single'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import SingleTitle from '../SingleTitle'
import SingleMetaAction2 from '../SingleMetaAction2'
import MyImage from '@/components/MyImage'

interface Props extends SingleType1Props {}

const SingleTypeVideo: FC<Props> = ({ post }) => {
	const {
		title,
		featuredImage,
		categories,
		excerpt,
		ncmazVideoUrl,
		postFormats,
	} = getPostDataFromPostFragment(post || {})

	const [isRendered, setIsRendered] = useState(false)

	useEffect(() => {
		setIsRendered(true)
	}, [])

	const renderMainVideo = () => {
		if (ncmazVideoUrl?.videoUrl && postFormats === 'video') {
			return isRendered ? (
				<ReactPlayer
					url={ncmazVideoUrl?.videoUrl || ''}
					className="absolute inset-0 h-full w-full"
					playing={true}
					muted={true}
					width="100%"
					height="100%"
					controls
				/>
			) : null
		}

		if (featuredImage?.sourceUrl) {
			return (
				<MyImage
					className="block h-full w-full object-cover"
					src={featuredImage?.sourceUrl || ''}
					alt={title}
					priority
					enableDefaultPlaceholder
					sizes="(max-width: 1024px) 100vw, 1240px"
					fill
				/>
			)
		}
		return null
	}

	const renderHeader = () => {
		return (
			<div className={`nc-SingleHeaderVideo`}>
				<div className="space-y-4 md:space-y-5">
					<CategoryBadgeList
						itemClass="!px-3"
						categories={categories?.nodes || []}
					/>
					<SingleTitle
						mainClass="text-neutral-900 font-semibold text-2xl sm:text-3xl md:!leading-[120%] dark:text-neutral-100"
						title={title || ''}
					/>

					<div className="max-w-4xl break-words pb-1 text-sm text-neutral-500 lg:text-lg dark:text-neutral-400">
						<span
							className="line-clamp-2"
							dangerouslySetInnerHTML={{ __html: excerpt }}
						></span>
					</div>

					<div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
					<div className="flex flex-wrap items-end justify-between gap-5">
						<PostMeta2
							size="large"
							className="flex-shrink-0 leading-none"
							hiddenCategories
							avatarRounded="rounded-full shadow-inner"
							post={{ ...post }}
						/>
						<SingleMetaAction2 post={{ ...post }} />
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Full-width video at top - YouTube style */}
			<div className="relative w-full pt-safe-top">
				{/* Mobile: full width, Desktop: constrained for better viewing */}
				<div className="mx-auto max-w-none sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
					<div className="aspect-w-16 aspect-h-9 relative bg-neutral-800 sm:rounded-lg overflow-hidden">
						{renderMainVideo()}
					</div>
				</div>
			</div>

			{/* Content section below video */}
			<div className="container mx-auto px-4 py-8 lg:py-12">
				<div className="mx-auto max-w-4xl">
					{renderHeader()}
				</div>
			</div>
		</>
	)
}

export default SingleTypeVideo