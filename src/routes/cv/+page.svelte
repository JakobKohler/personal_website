<script lang="ts">
	import DepartureBoard from '../../lib/components/DepartureBoard/DepartureBoard.svelte';

	let { data } = $props();

	function numberToLetter(n: number) {
		if (!Number.isInteger(n) || n < 1 || n > 26) {
			return ""
		}
		return String.fromCharCode(n + 64);
	}

	const rawEducation = data?.cv?.education || [];
	const rawWork = data?.cv?.work || [];

	let educationStations = $derived(
		rawEducation.flatMap((edu: { degrees: any[]; institution: any }, index: number) =>
			edu.degrees.map((degree) => {
				let viaText = degree.program;
				// if (degree.highlights?.length > 0) {
				//     viaText += ` ++++ ${degree.highlights.join(' ++++ ')}`;
				// }

				return {
					time: degree.startDate,
					timeEnd: degree.endDate,
					trainId: `bis ${degree.endDate}`,
					destination: edu.institution,
					via: viaText,
					delay: degree.delay,
					track: (rawEducation.length - index).toString()
				};
			})
		)
	);

	let workStations = $derived(
		rawWork.flatMap((workplace: { roles: any[]; location: any; company: any }, index: number) =>
			workplace.roles.map((role, roleIndex: number) => {
				let viaText = `${role.position} ++++ ${role.type} ++++ ${workplace.location}`;
				// if (role.highlights?.length > 0) {
				//     viaText += ` ++++ ${role.highlights.join(' ++++ ')}`;
				// }
				// if (role.skills?.length > 0) {
				//     viaText += ` ++++ Tech: ${role.skills.join(', ')}`;
				// }
				let track = (rawWork.length - index).toString()

				if (workplace.roles.length > 1) {
					track += numberToLetter(workplace.roles.length - roleIndex)
				}

				return {
					time: role.startDate,
					timeEnd: role.endDate,
					trainId: role.type,
					destination: workplace.company,
					via: viaText,
					track
				};
			})
		)
	);
</script>

<div class="outer">
	<div class="wrapper">
		<DepartureBoard title="Stations in Education" data={educationStations} />
	</div>

	<div class="wrapper">
		<DepartureBoard title="Stations in Professonal Experience" data={workStations} />
	</div>
</div>

<style lang="scss">
	.outer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.wrapper {
		margin: 1em;
		border: 4px solid silver;
		border-radius: 10px;
		width: 90%;
	}
</style>
