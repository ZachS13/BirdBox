async function getIdentifiedSpecies() {
    return { series: [] };
}
async function getOccupancyTrend() {
    return { series: [] };
}
async function getDailyActivity() {
    return { histogram: [] };
}
async function getTargetEfficiency() {
    return { target: 0, nonTarget: 0 };
}

module.exports = {
    getIdentifiedSpecies,
    getOccupancyTrend,
    getDailyActivity,
    getTargetEfficiency
};