/*
BambooHR REST API Wrapper for AppsScript / JS

Simple wrapper around BambooHR's v1 REST API.
Implements most endpoints.

Developer: Ryan Gordon (ry4n.sh)
Date: Jan 25th, 2024

For use, call newBambooHr() with arguments "companyDomain" (i.e. 'ACME') and your API key.
*/
class bambooHR {
    constructor(companyDomain, apiKey) {
        this.companyDomain = companyDomain;
        this.apiKey = apiKey;
        this.base64apiKey = Utilities.base64Encode(`${this.apiKey}:`);
        this.bambooHrURL = `https://api.bamboohr.com/api/gateway.php/${this.companyDomain}/v1`;
    }

    bambooHrApiRequest(endpoint, method, data) {
        /*
        * A utility function to make an authenticated API request to BambooHR.
        * @param {string} endpoint The specific API endpoint.
        * @param {string} method The HTTP method (GET, POST, PUT, DELETE).
        * @param {Object} [data] The payload for POST/PUT requests.
        * @return {Object} The response from the API.
        */
        var url = this.bambooHrURL + endpoint;
        var options = {
            'method': method,
            'contentType': 'application/json',
            'headers' : {
                'Authorization': `Basic ${this.base64apiKey}`,
                'Accept': 'application/json',
            },
        };
        if (data) {
            options['payload'] = JSON.stringify(data);
        }

        try {
            var response = UrlFetchApp.fetch(url, options);
            return JSON.parse(response.getContentText());
        } catch (e) {
            throw new Error(`Error fetching from BambooHR API: ${e}`);
        }
    }

    // Example Function: Get an Employee
    getEmployee(employeeId) {
        /*
        * Get an employee from BambooHR.
        * @param {string} employeeId The employee ID.
        * @return {Object} The employee object.
        */
        var endpoint = `/employees/${employeeId}/`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    // Example Function: Update an Employee
    updateEmployee(employeeId, data) {
        /*
        * Update an employee in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {Object} data The employee data to update.
        * @return {Object} The updated employee object.
        */
        var endpoint = `/employees/${employeeId}/`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    addEmployee(data) {
        /*
        * Add an employee to BambooHR.
        * @param {Object} data The employee data to add.
        * @return {Object} The added employee object.
        */
        var endpoint = `/employees/`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    getEmployeeDirectory(companyDomain) {
        /*
        * Get the employee directory from BambooHR.
        * @return {Object} The employee directory object.
        */
        var endpoint = `/employees/directory`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    listEmployeeFilesAndCategories(employeeId) {
        /*
        * List employee files and categories from BambooHR.
        * @param {string} employeeId The employee ID.
        * @return {Object} The employee files and categories object.
        */
        var endpoint = `/employees/${employeeId}/files`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    addEmployeeFileCategory(employeeId, data) {
        /*
        * Add an employee file category to BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {Object} data The employee file category data to add.
        * @return {Object} The added employee file category object.
        */
        var endpoint = `/employees/${employeeId}/files`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    updateEmployeeFile(employeeId, fileId, data) {
        /*
        * Update an employee file in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} fileId The file ID.
        * @param {Object} data The employee file data to update.
        * @return {Object} The updated employee file object.
        */
        var endpoint = `/employees/${employeeId}/files/${fileId}`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    getEmployeeFile(employeeId, fileId) {
        /*
        * Get an employee file from BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} fileId The file ID.
        * @return {Object} The employee file object.
        */
        var endpoint = `/employees/${employeeId}/files/${fileId}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    deleteEmployeeFile(employeeId, fileId) {
        /*
        * Delete an employee file from BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} fileId The file ID.
        * @return {Object} The deleted employee file object.
        */
        var endpoint = `/employees/${employeeId}/files/${fileId}`;
        return this.bambooHrApiRequest(endpoint, 'DELETE');
    }

    // write list company files and categories, add company file cateogry, update company file, delete company file, get a company file, upload company file
    listCompanyFilesAndCategories() {
        /*
        * List company files and categories from BambooHR.
        * @return {Object} The company files and categories object.
         */
        var endpoint = `/files`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    addCompanyFileCategory(data) {
        /*
        * Add a company file category to BambooHR.
        * @param {Object} data The company file category data to add.
        * @return {Object} The added company file category object.
        */
        var endpoint = `/files`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    updateCompanyFile(fileId, data) {
        /*
        * Update a company file in BambooHR.
        * @param {string} fileId The file ID.
        * @param {Object} data The company file data to update.
        * @return {Object} The updated company file object.
        */
        var endpoint = `/files/${fileId}`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    deleteCompanyFile(fileId) {
        /*
        * Delete a company file from BambooHR.
        * @param {string} fileId The file ID.
        * @return {Object} The deleted company file object.
        */
        var endpoint = `/files/${fileId}`;
        return this.bambooHrApiRequest(endpoint, 'DELETE');
    }

    getCompanyFile(fileId) {
        var endpoint = `/files/${fileId}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    uploadCompanyFile(data) {
        /*
        * Upload a company file to BambooHR.
        * @param {Object} data The company file data to upload.
        * @return {Object} The uploaded company file object.
        */
        var endpoint = `/files`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    // write get company report, request custom report
    getCompanyReport(reportId) {
        /*
        * Get a company report from BambooHR.
        * @param {string} reportId The report ID.
        * @return {Object} The company report object.
        */
        var endpoint = `/reports/${reportId}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    requestCustomReport(reportId, data) {
        /*
        * Request a custom report from BambooHR.
        * @param {string} reportId The report ID.
        * @param {Object} data The report data to request.
        * @return {Object} The requested report object.
        */
        var endpoint = `/reports/${reportId}`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    // write get table rows for employee and table, add table row, update table row, delete table row, get all updated employee table data
    getEmployeeTableRows(employeeId, tableId) {
        /*
        * Get employee table rows from BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} tableId The table ID.
        * @return {Object} The employee table rows object.
        */
        var endpoint = `/employees/${employeeId}/tables/${tableId}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    addTableRow(employeeId, tableId, data) {
        /*
        * Add a table row to BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} tableId The table ID.
        * @param {Object} data The table row data to add.
        * @return {Object} The added table row object.
        */
        var endpoint = `/employees/${employeeId}/tables/${tableId}`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    updateTableRow(employeeId, tableId, rowId, data) {
        /*
        * Update a table row in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} tableId The table ID.
        * @param {string} rowId The row ID.
        * @param {Object} data The table row data to update.
        * @return {Object} The updated table row object.
        */
        var endpoint = `/employees/${employeeId}/tables/${tableId}/${rowId}`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    deleteTableRow(employeeId, tableId, rowId) {
        /*
        * Delete a table row from BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {string} tableId The table ID.
        * @param {string} rowId The row ID.
        * @return {Object} The deleted table row object.
        */
        var endpoint = `/employees/${employeeId}/tables/${tableId}/${rowId}`;
        return this.bambooHrApiRequest(endpoint, 'DELETE');
    }

    getAllUpdatedEmployeeTableData(employeeId) {
        /*
        * Get all updated employee table data from BambooHR.
        * @param {string} employeeId The employee ID.
        * @return {Object} The updated employee table data object.
        */
        var endpoint = `/employees/${employeeId}/tables`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getListOfFields() {
        /*
        * Get a list of fields from BambooHR.
        * @return {Object} The list of fields object.
        */
        var endpoint = `/meta/fields`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getListOfTabularFields() {
        /*
        * Get a list of tabular fields from BambooHR.
        * @return {Object} The list of tabular fields object.
        */
        var endpoint = `/meta/tables`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getListFieldDetails() {
        /*
        * Get a list of field details from BambooHR.
        * @return {Object} The list of field details object.
        */
        var endpoint = `/meta/lists`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    updateValuesForListField(listFieldId, data) {
        /*
        * Update values for a list field in BambooHR.
        * @param {string} listFieldId The list field ID.
        * @param {Object} data The list field data to update.
        * @return {Object} The updated list field object.
        */
        var endpoint = `/meta/lists/${listFieldId}`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    getUsers() {
        /*
        * Get users from BambooHR.
        * @return {Object} The users object.
        */
        var endpoint = `/meta/users`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getTimeOffTypes() {
        /*
        * Get time off types from BambooHR.
        * @return {Object} The time off types object.
        */
        var endpoint = `/meta/time_off/types`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getTimeOffPolicies() {
        /*
        * Get time off policies from BambooHR.
        * @return {Object} The time off policies object.
        */
        var endpoint = `/meta/time_off/policies`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getTimeOffRequests() {
        /*
        * Get time off requests from BambooHR.
        * @return {Object} The time off requests object.
        */
        var endpoint = `/meta/time_off/requests`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    addTimeOffRequest(employeeId, data) {
        /*
        * Add a time off request to BambooHR.
        * @param {Object} data The time off request data to add.
        * @return {Object} The added time off request object.
        */
        var endpoint = `/meta/employees/${employeeId}/time_off/requests`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    changeRequestStatus(requestId, data) {
        /*
        * Change a request status in BambooHR.
        * @param {string} requestId The request ID.
        * @param {Object} data The request status data to change.
        * @return {Object} The changed request status object.
        */
        var endpoint = `/meta/time_off/requests/${requestId}/status`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    addTimeOffHistoryItem(employeeId, requestId, data) {
        /*
        * Add a time off history item to BambooHR.
        * @param {string} requestId The request ID.
        * @param {Object} data The time off history item data to add.
        * @return {Object} The added time off history item object.
        */
        var endpoint = `/meta/employees/${employeeId}time_off/requests/${requestId}`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    adjustTimeOffBalance(employeeId, data) {
        /*
        * Adjust a time off balance in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {Object} data The time off balance data to adjust.
        * @return {Object} The adjusted time off balance object.
        */
        var endpoint = `/meta/time_off/employees/${employeeId}/time_off/balance_adjustment`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    listTimeOffPoliciesForEmployee(employeeId) {
        /*
        * List time off policies for an employee from BambooHR.
        * @param {string} employeeId The employee ID.
        * @return {Object} The time off policies for an employee object.
        */
        var endpoint = `/meta/employees/${employeeId}/time_off/policies`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    assignTimeOffPoliciesForEmployee(employeeId, data) {
        /*
        * Assign time off policies for an employee in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {Object} data The time off policies for an employee data to assign.
        * @return {Object} The assigned time off policies for an employee object.
        */
        var endpoint = `/meta/employees/${employeeId}/time_off/policies`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    estimateFutureTimeOffBalance(employeeId, data) {
        /*
        * Estimate a future time off balance in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {Object} data The future time off balance data to estimate.
        * @return {Object} The estimated future time off balance object.
        */
        var endpoint = `/meta/employees/${employeeId}/time_off/calculator`;
        return this.bambooHrApiRequest(endpoint, 'PUT', data);
    }

    getTimeOffList() {
        /*
        * Get a time off list from BambooHR.
        * @return {Object} The time off list object.
        */
        var endpoint = `/meta/time_off/whos_out`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getEmployeePhoto(employeeId, size) {
        /*
        * Get an employee photo from BambooHR.
        * @param {string} employeeId The employee ID.
        * @return {Object} The employee photo object.
        */
        var endpoint = `/employees/${employeeId}/photo/${size}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    storeEmployeePhoto(employeeId, data) {
        /*
        * Store an employee photo in BambooHR.
        * @param {string} employeeId The employee ID.
        * @param {Object} data The employee photo data to store.
        * @return {Object} The stored employee photo object.
        */
        var endpoint = `/employees/${employeeId}/photo`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    getUpdatedEmployeeIDs(since) {
        /*
        * Get updated employee IDs from BambooHR.
        * @param {string} since The date since when to get updated employee IDs.
        * @return {Object} The updated employee IDs object.
        */
        var endpoint = `/employees/changed?since=${since}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    userLogin(data) {
        /*
        * User login to BambooHR.
        * @param {Object} data The user login data.
        * @return {Object} The user login object.
        */
        var endpoint = `/login`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    getBenefitDeductionTypes() {
        /*
        * Get benefit deduction types from BambooHR.
        * @return {Object} The benefit deduction types object.
        */
        var endpoint = `/benefits/settings/deduction_types/all`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    getEmployeeDependents(id) { // write
        /*
        * Get employee dependents from BambooHR.
        * @param {string} id The employee dependent ID.
        * @return {Object} The employee dependents object.
        */
        var endpoint = `/v1/employeedependents/${id}`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    updateEmployeeDependent(id, data) {
        /*
        * Update an employee dependent in BambooHR.
        * @param {string} id The employee dependent ID.
        * @param {Object} data The employee dependent data to update.
        * @return {Object} The updated employee dependent object.
        */
        var endpoint = `/v1/employeedependents/${id}`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }

    getAllEmployeeDependents() {
        /*
        * Get all employee dependents from BambooHR.
        * @return {Object} The all employee dependents object.
        */
        var endpoint = `/v1/employeedependents`;
        return this.bambooHrApiRequest(endpoint, 'GET');
    }

    addEmployeeDependent(data) {
        /*
        * Add an employee dependent to BambooHR.
        * @param {Object} data The employee dependent data to add.
        * @return {Object} The added employee dependent object.
        */
        var endpoint = `/v1/employeedependents`;
        return this.bambooHrApiRequest(endpoint, 'POST', data);
    }
}

function newBambooHR(companyDomain, apiKey) {
  var bamboo = new bambooHR(companyDomain, apiKey);
  return bamboo;
}