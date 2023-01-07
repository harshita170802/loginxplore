
var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var DBName="STUDENT-TABLE";
var RelationName="SCHOOL-DB";
var connToken="90938136|-31949272997588755|90955123";
$('#RollNo').focus();

function resetForm() {
$("#RollNo").val("");
$("#fullName").val("");
$("#clas").val("");
$("#birthDate").val("");
$("#Address").val("");
$("#EnrollDate").val("");
$("#RollNo").prop("disabled",false);
$("#save").prop("disabled",true);
$("#change").prop("disabled",true);
$("#reset").prop("disabled",true);
$("#RollNo").focus();
}

function saveData() {
var jsonStrObj = validateData();
if (jsonStrObj === "") {
return " ";
}
var putReqStr = createPUTRequest(connToken,jsonStrObj,DBName , RelationName);
alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr,jpdbIRL,jpdbIML);
alert(JSON.stringify(resJsonObj));
jQuery.ajaxSetup({async: true});
resetForm();
$('#RollNo').focus();
}

function saveRecNo2LS(jsonObj){
	var lvData = JSON.parese(jsonObj.data);
	localStorage.setItem('recno',lvData.rec_no);
}
function getIdAsJsonObj(){
	var RollNo=$('#RollNo').val();
	var jsonStr={
		RollNo: RollNo
	};
return JSON.stringify(jsonStr);
}
function getEmp(){
	var IdJsonObj=getIdAsJsonObj();
	var getRequest=createGET_BY_KEYRequest(connToken,DBName,RelationName,IdJsonObj);
	jQuery.ajaxSetup({async: false});
	var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
	jQuery.ajaxSetup({async: true});
	if(resJsonObj.status===400){
		$("#save").prop("disabled",false);
		$("#reset").prop("disabled",false);
		$("#RollNo").focus();
	}else if(resJsonObj.status===200){
	
		$("#RollNo").prop("disabled",true);
		fillData(resJsonObj);
		
		$("#change").prop("disabled",false);
		$("#reset").prop("disabled",false);
		$("#RollNo").focus();
	}
}
function changeData(){
	$("#change").prop("disabled",true);
	jsonChg=validateData();
	var updateRequest=createUPDATERecordRequest(connToken, jsonChg, DBName, RelationName,localStorage.getItem('recno'));
	jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async: true});
	console.log(resJsonObj);
	resetForm();
	$("#RollNo").focus();
}


function fillData(jsonObj){
	saveRecNo2LS(jsonObj);
	var record=JSON.parse(jsonObj.data).record;
	$("#RollNo").val(record.RollNo);
	$("#fullName").val(record.FullName);
	$("#clas").val(record.class);
	$("#birthDate").val(record.BirthDate);
	$("#Address").val(record.Address);
        $("#EnrollDate").val(record.EnrollmentDate);
}

function validateData(){
var RollNovar, fullNamevar,clasvar, birthDatevar, Addressvar, EnrollDatevar;
RollNovar=$("#RollNo").val("");
fullNamevar=$("#fullName").val("");
clasvar=$("#clas").val("");
birthDatevar=$("#birthDate").val("");
Addressvar=$("#Address").val("");
EnrollDatevar=$("#EnrollDate").val("");
if(RollNovar === ''){
	alert('RollNo missing');
	$("#RollNo").focus();
	return "";
}
if(fullNamevar === ''){
	alert('fullName missing');
	$("#fullName").focus();
	return "";
}
if(clasvar === ''){
	alert('class missing');
	$("#clas").focus();
	return "";
}
if(birthDatevar === ''){
	alert('Birth Date missing');
	$("#birthDate").focus();
	return "";
}
if( Addressvar === ''){
	alert(' Address missing');
	$("# Address").focus();
	return "";
}
if(EnrollDatevar === ''){
	alert('Enrollment Date missing');
	$("#EnrollDate").focus();
	return "";
}


var jsonStrObj={
	RollNo: RollNovar,
	fillName: fullNamevar,
	clas: clasvar,
	birthDate: birthDatevar,
	Address: Addressvar,
	EnrollDate: EnrollDatevar
};
return JSON.stringify(jsonStrObj);
}
