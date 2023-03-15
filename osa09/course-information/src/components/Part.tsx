import { CoursePart } from '../types'
import { assertNever } from '../utils'

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case 'normal':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
				</p>
			)
		case 'groupProject':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					project exercises {part.groupProjectCount}
				</p>
			)
		case 'submission':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
					<br />
					submit to {part.exerciseSubmissionLink}
				</p>
			)
		case 'special':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i><br/>
                    required skills: {part.requirements.toString()}
				</p>
			)
		default:
			return assertNever(part)
	}
}

export default Part
