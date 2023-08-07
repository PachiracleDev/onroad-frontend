export function getDate(createdAt: Date): string {
	const now = new Date();
	const creationTime = new Date(createdAt);
	const timeDifference = now.getTime() - creationTime.getTime();

	const minutes = Math.floor(timeDifference / 1000 / 60);
	const hours = Math.floor(timeDifference / 1000 / 60 / 60);
	const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

	if (minutes == 0) {
		return "Ahora";
	}

	if (minutes < 60) {
		return `Hace ${minutes} minuto` + (minutes > 1 ? "s" : "");
	} else if (hours < 24) {
		return `Hace ${hours} hora` + (hours > 1 ? "s" : "");
	} else {
		return `Hace ${days} día` + (days > 1 ? "s" : "");
	}
}
