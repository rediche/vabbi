// FUNCTION 1
function calculateTimeForPips() {

    const warScoreValues = [3, 4, 5]
    const warScorePlacement = parseInt(warScoreValues[sliderWarScorePlacement.value])

    const wvwRankValues = [1, 2, 3, 4, 5, 6, 7]
    const wvwRank = parseInt(wvwRankValues[sliderWvWRank.value])

    const commanderValues = [0, 1]
    const commander = parseInt(commanderValues[sliderCommander.value])

    const commitmentValues = [0, 1]
    const commitment = parseInt(commitmentValues[sliderCommitment.value])

    const outnumberedValues = [0, 5]
    const outnumbered = parseInt(outnumberedValues[sliderOutnumbered.value])

    const totalPips = warScorePlacement + wvwRank + commander + commitment + outnumbered

    let result = Math.ceil((1450 / totalPips) * 5)
    if (result % 5 !== 0)
        result += 5 - (result % 5)
    document.forms['calculatorHoursPips'].Result.value = result
    document.forms['calculatorHoursPips'].Result2.value = (result / 60).toFixed(2)

    // calculation for warscore 3
    let minimum = totalPips - warScorePlacement + 3
    minimum = Math.ceil((1450 / minimum) * 5)
    if (minimum % 5 !== 0)
        minimum += 5 - (minimum % 5)
    document.forms['calculatorHoursPips'].MinimumResult.value = minimum;
    document.forms['calculatorHoursPips'].MinimumResult2.value = (minimum / 60).toFixed(2);

    // calculation for warscore 4
    let average = totalPips - warScorePlacement + 4
    average = Math.ceil((1450 / average) * 5)
    if (average % 5 !== 0)
        average += 5 - (average % 5)
    document.forms['calculatorHoursPips'].AverageResult.value = average;
    document.forms['calculatorHoursPips'].AverageResult2.value = (average / 60).toFixed(2);

    // calculation for warscore 5
    let maximum = totalPips - warScorePlacement + 5
    maximum = Math.ceil((1450 / maximum) * 5)
    if (maximum % 5 !== 0)
        maximum += 5 - (maximum % 5)
    document.forms['calculatorHoursPips'].MaximumResult.value = maximum;
    document.forms['calculatorHoursPips'].MaximumResult2.value = (maximum / 60).toFixed(2);
}

// FUNCTION 2
function calculateRewardTrack() {

    const participationValuesCore = [0, 25, 60, 95, 125, 160, 195]
    let participation = parseInt(participationValuesCore[sliderWvWCore.value])

    const participationValuesEOTM = [0, 19, 46, 76, 90, 120, 146]
    let participationEOTM = parseInt(participationValuesEOTM[sliderEOTM.value])

    if (participationEOTM !== 0 && participation !== 0)
        alert("Can't have both normal WvW and EOTM participation on, please select only one of the two")
    else
    if (participation === 0 && participationEOTM !== 0)
        participation = participationEOTM

    const guildValues = [0, 3, 4, 5, 6, 7, 8, 9, 10]
    let guildBooster = guildValues[sliderGuild.value]
    let elements = document.forms['rewardTrackCalculator'].elements
    let totalBoosters = guildBooster
    for (let element of elements) {
        if (element.id === "userInput" && element.type === "radio" && element.checked) {
            totalBoosters += parseInt(element.value)
        } else if (element.id === "userInput" && element.type === "text" && element.value !== undefined) {
            totalBoosters += parseInt(element.value)
        }
    }
    document.forms['rewardTrackCalculator'].TotalBoosterValue.value = totalBoosters + "%"
    var newParticipation = ((participation * totalBoosters) / 100) + participation
    document.forms['rewardTrackCalculator'].ParticipationValueWithBoosters.value = Math.floor(newParticipation)
    var totalTimeNeeded = Math.ceil((20000 / newParticipation) * 5)
    if (totalTimeNeeded % 5 !== 0)
        totalTimeNeeded += 5 - (totalTimeNeeded % 5)
    document.forms['rewardTrackCalculator'].TimeMinutes.value = totalTimeNeeded
    document.forms['rewardTrackCalculator'].TimeHours.value = (totalTimeNeeded / 60).toFixed(2)
}

// FUNCTION 3

function calculateTotalTicketsBackpiece() {
    const warbringer = 2800
    const ticketsOwned = parseInt(document.forms['calculatorTicketsBackpiece'].Tickets.value)
    let recruit = document.getElementById("RecruitID")
    let soldier = document.getElementById("SoldierID")
    let general = document.getElementById("GeneralID")
    let commander = document.getElementById("CommanderID")

    if (recruit.checked == true)
        recruit = parseInt(document.getElementById("RecruitID").value)
    else
        recruit = 0

    if (soldier.checked == true)
        soldier = parseInt(document.getElementById("SoldierID").value)
    else
        soldier = 0

    if (general.checked == true)
        general = parseInt(document.getElementById("GeneralID").value)
    else
        general = 0

    if (commander.checked == true)
        commander = parseInt(document.getElementById("CommanderID").value)
    else
        commander = 0

    const ticketsSpent = recruit + soldier + general + commander
    const ticketsRemaining = warbringer - ticketsSpent - ticketsOwned
    if (ticketsRemaining <= 0)
        document.forms['calculatorTicketsBackpiece'].MissingTickets.value = 0
    else
        document.forms['calculatorTicketsBackpiece'].MissingTickets.value = ticketsRemaining
    const fullWeeks = Math.ceil(ticketsRemaining / 365)
    if (fullWeeks <= 0)
        document.forms['calculatorTicketsBackpiece'].MissingWeeks.value = 0
    else
        document.forms['calculatorTicketsBackpiece'].MissingWeeks.value = fullWeeks
}

// FUNCTION 4
function calculateTotalTicketsArmor() {
    let elements = document.forms['calculatorTicketsArmor'].elements
    let hasTickets = 0
    let wantsT3 = false
    let hasPieces = document.getElementById("armorCheckbox").checked
    for (let element of elements) {
        if (element.id === "userInput" && element.value === "3" && element.type === "radio" && element.checked)
            wantsT3 = true
        if (element.id === "userInput" && element.value !== undefined && element.name === "Tickets")
            hasTickets += parseInt(element.value)
        if (hasPieces && element.id === "userInputArmors" && element.checked && element.offsetParent !== null) {
            console.log("element.name " + element.name)
            console.log("element.offsetParent " + element.offsetParent)
            console.log("element.id " + element.id)
            hasTickets += parseInt(element.value)
        }

    }

    let fullArmorCost
    if (wantsT3)
        fullArmorCost = 9190 - hasTickets
    else
        fullArmorCost = 7880 - hasTickets
    document.forms['calculatorTicketsArmor'].MissingTickets.value = fullArmorCost

    let fullWeeks = Math.ceil(fullArmorCost / 365)
    document.forms['calculatorTicketsArmor'].MissingWeeks.value = fullWeeks

}

function updateArmorDisplay() {
    if (document.getElementById("armorCheckbox").checked) {
        const armorProperties = {
            tier2: false,
            tier3: false,
            weight: undefined
        }
        const elements = document.forms['calculatorTicketsArmor'].elements

        for (element of elements) {
            if (element.name === "ArmorTier" && element.id === "userInput" && element.type === "radio" && element.checked) {
                if (element.value === "3") {
                    armorProperties.tier3 = true
                } else {
                    armorProperties.tier2 = true
                }
            }
            if (element.name === "ArmorWeight" && element.id === "userInput" && element.type === "radio" && element.checked) {
                armorProperties.weight = element.value
            }
        }

        if (!(armorProperties.tier2 || armorProperties.tier3) || !armorProperties.weight) {
            return
        }

        if (armorProperties.tier2) {
            switch (armorProperties.weight) {
                case "4":
                    toggleArmor("lightHero")
                    break;
                case "5":
                    toggleArmor("mediumHero")
                    break;
                case "6":
                    toggleArmor("heavyHero")
                    break;
            }
        } else if (armorProperties.tier3) {
            switch (armorProperties.weight) {
                case "4":
                    toggleArmor("lightMistforged")
                    break;
                case "5":
                    toggleArmor("mediumMistforged")
                    break;
                case "6":
                    toggleArmor("heavyMistforged")
                    break;
            }
        }
    } else {
        toggleArmor()
    }
}

function toggleArmor(show) {
    document.getElementById("lightHero").style.display = "none"
    document.getElementById("mediumHero").style.display = "none"
    document.getElementById("heavyHero").style.display = "none"
    document.getElementById("lightMistforged").style.display = "none"
    document.getElementById("mediumMistforged").style.display = "none"
    document.getElementById("heavyMistforged").style.display = "none"
    if (show !== undefined)
        document.getElementById(show).style.display = "block"
}

function updateBackpieceDisplay(){
    if (document.getElementById("backpieceCheckbox").checked) {
        toggleBackpiece("backpiecesSelection")
    }
}

function toggleBackpiece(show){
    document.getElementById("backpiecesSelection").style.display = "none"
    if (show !== undefined)
        document.getElementById(show).style.display = "block"
}