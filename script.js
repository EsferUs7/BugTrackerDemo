// --- MENU EVENTS ---
document.querySelectorAll("#actionsMenu a").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        alert(`You clicked: ${item.textContent}`);
    });
});

document.querySelectorAll("#helpMenu a").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        alert("Help section placeholder");
    });
});

// --- TABS FUNCTIONALITY ---
const toolbar = document.getElementById("toolbar");
const tabButtons = document.querySelectorAll(".tab-button");

function setToolbar(tab) {
    toolbar.innerHTML = "";

    if (tab === "create") {
        addButton("Create Report", "Click to Create Report", () => alert("Create clicked"));
        addButton("Refresh", "Click to Refresh Reports", () => alert("Refresh clicked"));
    }
    else if (tab === "edit") {
        const label = document.createElement("label");
        label.textContent = "Report ID: ";

        const select = document.createElement("select");
        select.id = "editReportSelect";
        select.title = "Click to select the Report Id";
        select.innerHTML = `
        <option value=""></option>
        <option value="Bug-101">Bug-101</option>
        <option value="Bug-102">Bug-102</option>
    `;

        label.appendChild(select);
        toolbar.appendChild(label);

        addButton("Open", "Click to Open Report", () => {
            if (!select.value) {
                alert("Report Id is not selected");
                return;
            }
            alert("Opening " + select.value);
        });
    }
    else if (tab === "find") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("find-toolbar");

        const row = document.createElement("div");
        row.classList.add("find-row");
        row.innerHTML = `
      <div class="find-col">
        <label title="Simple mode activation">
          <input type="radio" name="filterMode" value="simple" checked> Without filter
        </label>
        <label title="Filter mode activation">
          <input type="radio" name="filterMode" value="filter"> With filter
        </label>
      </div>

      <div class="find-col">
        <label><input type="checkbox" data-target="reportId" title="Check to activate Report Id filter"> Report Id</label>
        <select id="reportIdSelect" title="Click to select Report Id" disabled>
          <option value=""></option>
          <option value="Bug-101">Bug-101</option>
          <option value="Bug-102">Bug-102</option>
        </select>
      </div>

      <div class="find-col">
        <label><input type="checkbox" data-target="severity" title="Check to activate Severity filter"> Severity</label>
        <select id="severitySelect" title="Click to select Severity" disabled>
          <option value=""></option>
          <option value="Critical">Critical</option>
          <option value="Major">Major</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div class="find-col">
        <label><input type="checkbox" data-target="status" title="Check to activate Status filter"> Status</label>
        <select id="statusSelect" title="Click to select Status" disabled>
          <option value=""></option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Fixed">Fixed</option>
          <option value="Reopen">Reopen</option>
          <option value="Retest">Retest</option>
          <option value="Rejected">Rejected</option>
          <option value="Duplicate">Duplicate</option>
          <option value="Failed Retest">Failed Retest</option>
        </select>
      </div>

      <div class="find-col">
        <label><input type="checkbox" data-target="reporter" title="Check to activate Reporter filter"> Reporter</label>
        <select id="reporterSelect" title="Click to select Reporter" disabled>
          <option value=""></option>
          <option value="TestAdmin">TestAdmin</option>
        </select>
      </div>

      <div class="find-col">
        <label><input type="checkbox" data-target="assignee" title="Check to activate Assignee filter"> Assignee</label>
        <select id="assigneeSelect" title="Click to select Assignee" disabled>
          <option value=""></option>
          <option value="TestAdmin">TestAdmin</option>
        </select>
      </div>

      <div class="find-col">
        <label><input type="checkbox" data-target="issueType" title="Check to activate Issue Type filter"> Issue Type</label>
        <select id="issueTypeSelect" title="Click to select Issue Type" disabled>
          <option value=""></option>
          <option value="Bug">Bug</option>
          <option value="Task">Task</option>
        </select>
      </div>

      <div class="find-buttons">
        <button id="clearBtn" disabled>Clear Filters</button>
        <button id="findBtn" title="Click to find the report">Find Report</button>
      </div>
    `;
        wrapper.appendChild(row);
        toolbar.appendChild(wrapper);

        const checkboxes = row.querySelectorAll("input[type=checkbox]");
        const selects = row.querySelectorAll("select");
        const clearBtn = document.getElementById("clearBtn");

        function updateControls() {
            const mode = document.querySelector("input[name=filterMode]:checked").value;

            if (mode === "simple") {
                checkboxes.forEach(cb => {
                    cb.disabled = true;
                    cb.checked = false;
                });
                selects.forEach(sel => {
                    sel.disabled = true;
                    sel.value = "";
                });
                clearBtn.disabled = true;
            } else {
                checkboxes.forEach(cb => {
                    cb.disabled = false;
                    const sel = document.getElementById(cb.dataset.target + "Select");
                    if (cb.checked) {
                        sel.disabled = false;
                    } else {
                        sel.disabled = true;
                        sel.value = "";
                    }
                });
                let anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                clearBtn.disabled = !anyChecked;
                if (!clearBtn.disabled) {
                    clearBtn.title = "Click to clear filters";
                }
            }
        }

        toolbar.querySelectorAll("input[name=filterMode]").forEach(r => {
            r.addEventListener("change", updateControls);
        });

        checkboxes.forEach(cb => {
            cb.addEventListener("change", updateControls);
        });

        clearBtn.addEventListener("click", () => {
            checkboxes.forEach(cb => cb.checked = false);
            selects.forEach(sel => { sel.value = ""; sel.disabled = true; });
            updateControls();
        });

        document.getElementById("findBtn").addEventListener("click", () => {
            const mode = document.querySelector("input[name=filterMode]:checked").value;
            if (mode === "simple") {
                alert("Showing all reports (no filter).");
                return;
            }

            let anyChecked = false;
            for (let cb of checkboxes) {
                if (cb.checked) {
                    anyChecked = true;
                    const sel = document.getElementById(cb.dataset.target + "Select");
                    if (!sel.value) {
                        alert(cb.labels[0].innerText + " is not defined");
                        return;
                    }
                }
            }
            if (!anyChecked) {
                alert("The filter criteria is not defined");
                return;
            }

            alert("Reports filtered successfully (mock). If no matches -> No Reports were found to match your search");
        });

        updateControls();
    }

    else if (tab === "export") {
        addButton("Export to File", "Click to Export Report", () => alert("Export clicked"));
    }
    else if (tab === "admin") {
        addButton("CreateAccount", "Click to Create Account", () => {
            window.location = "create_account.html";
        });
        addButton("RemoveAccount", "Click to Remove Account", () => alert("RemoveAccount clicked"));
    }
}

function addButton(text, title, handler) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.title = title;
    btn.addEventListener("click", handler);
    toolbar.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", () => {
    const signoutBtn = document.querySelector(".signout");
    if (signoutBtn) {
        signoutBtn.addEventListener("click", () => {
            alert("You have signed out.");
            window.location.href = "index.html";
        });
    }
});

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        setToolbar(btn.dataset.tab);
    });
});

setToolbar("create");

// --- TABLE SORTING ---
document.querySelectorAll("#bugTable th").forEach((th, colIndex) => {
    let asc = true;
    th.addEventListener("click", () => {
        const tbody = th.closest("table").querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        rows.sort((a, b) => {
            let valA = a.children[colIndex].innerText.trim();
            let valB = b.children[colIndex].innerText.trim();

            // Try number sort
            let numA = parseFloat(valA.replace(/[^\d.-]/g, ""));
            let numB = parseFloat(valB.replace(/[^\d.-]/g, ""));
            if (!isNaN(numA) && !isNaN(numB)) {
                return asc ? numA - numB : numB - numA;
            }

            // Date sort
            let dateA = Date.parse(valA);
            let dateB = Date.parse(valB);
            if (!isNaN(dateA) && !isNaN(dateB)) {
                return asc ? dateA - dateB : dateB - dateA;
            }

            // String sort
            return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        });
        asc = !asc;
        tbody.innerHTML = "";
        rows.forEach(r => tbody.appendChild(r));
    });
});
