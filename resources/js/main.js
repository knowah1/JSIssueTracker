// Event handler for click of Submit button
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// Save issue function
function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  // Using Chance to generate random ID
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  // Reset issues form
  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}


// Toggle Open/Close flag for issues
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      if (issues[i].status == 'Open'){
        issues[i].status = 'Closed';
        // How can I change button text in the JavaScript below?
        closeBtn.textContent = 'Open';
      } else {
        issues[i].status = 'Open';
      }

    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

// Remove issue from list
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}



// Fetch issues from data storage
function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML += '<div class="well"' +
                            '<h6>Issue ID: ' + id + '</h6>' +
                            '<p><span class="label label-info">' + status + '</span></p>' +
                            '<h3>' + desc + '</h3>' +
                            '<p><span class="glyphicon glyphicon-time"</span> ' + severity + '</p>' +
                            '<p><span class="glyphicon glyphicon-user"</span> ' + assignedTo + '</p>' +
                            '<a href="#" id="closeBtn" onclick="setStatusClosed(\''+ id + '\')" class="btn btn-warning">Close</a> ' +
                            '<a href="#" id="delBtn" onclick="deleteIssue(\''+ id + '\')" class="btn btn-danger">Delete</a>' +
                            '</div>';
  }
}
