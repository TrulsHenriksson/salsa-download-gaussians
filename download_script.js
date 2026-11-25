function downloadGaussian(){
    let rows = document.getElementById("gaussian-results").innerText.split("\n")
    if (rows.length <= 1) {
        alert("Unable to download: No Gaussians fitted.")
        return
    }
    if (rows[0].startsWith("Offset")) {
        rows.splice(0, 1)
    }

    let csvContent = "peak_number,ctr,ctr_err,amp,amp_err,fwhm,fwhm_err"
    for (let i = 0; i < rows.length; i += 4) {
        const chunk = rows.slice(i, i + 4)
        csvContent += "\n"
        csvContent += chunk[0].slice(1) + ","
        csvContent += chunk[1].matchAll(/-?\d+(?:\.\d+)?/g).join(",") + ","
        csvContent += chunk[2].matchAll(/-?\d+(?:\.\d+)?/g).join(",") + ","
        csvContent += chunk[3].matchAll(/-?\d+(?:\.\d+)?/g).join(",")
    }

    let filename = [...document.getElementsByClassName("cursor-pointer text-left")].filter(el => !el.parentElement.classList.contains("border-transparent"))[0].innerText
    var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent)
    var link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", filename + ".csv")
    document.body.appendChild(link)  // Required for FF
    link.click()
}

let downloadButton = document.createElement("button")
downloadButton.setAttribute("onclick", "downloadGaussian()")
downloadButton.classList.add("text-xs", "px-2", "py-1", "bg-gray-200", "rounded", "hover:bg-gray-300")
downloadButton.innerText = "Download Gaussian results"
document.getElementsByClassName("flex items-center justify-between")[0].appendChild(downloadButton)