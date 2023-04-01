
let schoolNameEl = document.getElementById('school-name');
let schoolAddressEl = document.getElementById('school-address');
let schoolPhNumEl = document.getElementById('school-ph-number');
let schoolEmailEl = document.getElementById('school-email');
let rollNumEl = document.getElementById('roll-no');
let fatherNameEl = document.getElementById('father-name');
let attendanceEl = document.getElementById('attendance');
let admissionNumEl = document.getElementById('admission-no');
let nameEl = document.getElementById('name');
let classEl = document.getElementById('class');
let sectionEl = document.getElementById('section');
let motherNameEl = document.getElementById('mother-name');
let dobEl = document.getElementById('dob');
let resultEl = document.getElementById('result');
let gradeEl = document.getElementById('grade');
let percentageEl = document.getElementById('percentage');
let titleNameEl = document.getElementById('title-name');

let intB12TelEl = document.getElementById('int-b1-2-tel')
let intB12HinEl = document.getElementById('int-b1-2-hin')
let intB12EngEl = document.getElementById('int-b1-2-eng')
let intB12MatEl = document.getElementById('int-b1-2-mat')
let intB12CsEl = document.getElementById('int-b1-2-cs')
let intB12SsEl = document.getElementById('int-b1-2-ss')

let term1TelEl = document.getElementById('term1-tel')
let term1HinEl = document.getElementById('term1-hin')
let term1EngEl = document.getElementById('term1-eng')
let term1MatEl = document.getElementById('term1-mat')
let term1CsEl = document.getElementById('term1-cs')
let term1SsEl = document.getElementById('term1-ss')

let total1TelEl = document.getElementById('total1-tel')
let total1HinEl = document.getElementById('total1-hin')
let total1EngEl = document.getElementById('total1-eng')
let total1MatEl = document.getElementById('total1-mat')
let total1CsEl = document.getElementById('total1-cs')
let total1SsEl = document.getElementById('total1-ss')

let total12TelEl = document.getElementById('total1-2-tel')
let total12HinEl = document.getElementById('total1-2-hin')
let total12EngEl = document.getElementById('total1-2-eng')
let total12MatEl = document.getElementById('total1-2-mat')
let total12CsEl = document.getElementById('total1-2-cs')
let total12SsEl = document.getElementById('total1-2-ss')



let intB34TelEl = document.getElementById('int-b3-4-tel')
let intB34HinEl = document.getElementById('int-b3-4-hin')
let intB34EngEl = document.getElementById('int-b3-4-eng')
let intB34MatEl = document.getElementById('int-b3-4-mat')
let intB34CsEl = document.getElementById('int-b3-4-cs')
let intB34SsEl = document.getElementById('int-b3-4-ss')

let term2TelEl = document.getElementById('term2-tel')
let term2HinEl = document.getElementById('term2-hin')
let term2EngEl = document.getElementById('term2-eng')
let term2MatEl = document.getElementById('term2-mat')
let term2CsEl = document.getElementById('term2-cs')
let term2SsEl = document.getElementById('term2-ss')

let total2TelEl = document.getElementById('total2-tel')
let total2HinEl = document.getElementById('total2-hin')
let total2EngEl = document.getElementById('total2-eng')
let total2MatEl = document.getElementById('total2-mat')
let total2CsEl = document.getElementById('total2-cs')
let total2SsEl = document.getElementById('total2-ss')



let myGlobalData;
async function fetchData() {
  try {
    const response = await fetch(
      "http://stageapi.iguru.guru:222/api/ExamManagement/GetStudentProgressReports?schoolID=282&sectionID=2682&eXamMasID=8442&students=181521",
      { method: "GET" }
    );
    const data = await response.json();
    myGlobalData = data.Response;
    displayData(myGlobalData);
  } catch (error) {
    console.error(error);
  }
}

function dateConverter(str) {
  let dateString = str;
  let dateObj = new Date(dateString);
  let day = dateObj.toLocaleString("en-us", { day: "2-digit" });
  let month = dateObj.toLocaleString("en-us", { month: "short" });
  let year = dateObj.toLocaleString("en-us", { year: "numeric" });
  let formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function bestOfTwo(one, two) {
  let best = one > two ? one : two;
  return best;
}

function displayData(apiData) {
  let { ProgressList } = apiData;
  let { ExamMasters, stGrades, lstInternal, lstStudentInfo } = ProgressList;
  let {
    stInternals,
    lstStudent,
    AdmissionNumber,
    cusAttendance,
    Grade,
    Totalper,
    SchoolName,
    SchoolAddress,
    SchoolPhoneNumber,
    SchoolEmail,
    Name,
    ClassName,
    SectionName,
    RollNumber,
    DOB,
    FatherName,
    MotherName,
  } = lstStudentInfo[0];
  let Result = parseInt(Totalper) > 35 ? "Pass" : "Fail";
  schoolNameEl.textContent = SchoolName;
  schoolAddressEl.textContent = SchoolAddress;
  schoolPhNumEl.textContent = " , Ph :- " + SchoolPhoneNumber;
  schoolEmailEl.textContent = SchoolEmail;
  rollNumEl.textContent = RollNumber;
  fatherNameEl.textContent = FatherName.toUpperCase();
  motherNameEl.textContent = MotherName.toUpperCase();
  dobEl.textContent = dateConverter(DOB);
  classEl.textContent = ClassName;
  sectionEl.textContent = SectionName;
  nameEl.textContent = Name;
  gradeEl.textContent = Grade;
  percentageEl.textContent = Totalper;
  resultEl.textContent = Result;
  attendanceEl.textContent = cusAttendance[0].PresenceDays;
  admissionNumEl.textContent = AdmissionNumber;

  const teluguIntMarks = stInternals
    .filter((item) => item.ExamSubjectName === "TELUGU")
    .map((item) => item.ScoredMarks);

  let best12Tel = bestOfTwo(teluguIntMarks[0], teluguIntMarks[1]);
  intB12TelEl.textContent = best12Tel;
  let best34Tel = bestOfTwo(teluguIntMarks[2], teluguIntMarks[3]);
  intB34TelEl.textContent = best34Tel;

  const englishIntMarks = stInternals
    .filter((item) => item.ExamSubjectName === "ENGLISH")
    .map((item) => item.ScoredMarks);

  let best12Eng = bestOfTwo(englishIntMarks[0], englishIntMarks[1]);
  intB12EngEl.textContent = best12Eng;
  let best34Eng = bestOfTwo(englishIntMarks[2], englishIntMarks[3]);
  intB34EngEl.textContent = best34Eng;

  const hindiIntMarks = stInternals
    .filter((item) => item.ExamSubjectName === "HINDI")
    .map((item) => item.ScoredMarks);

  let best12Hin = bestOfTwo(hindiIntMarks[0], hindiIntMarks[1]);
  intB12HinEl.textContent = best12Hin;
  let best34Hin = bestOfTwo(hindiIntMarks[2], hindiIntMarks[3]);
  intB34HinEl.textContent = best34Hin;

  const mathematicsIntMarks = stInternals
    .filter((item) => item.ExamSubjectName === "MATHMATICS")
    .map((item) => item.ScoredMarks);
  let best12Mat = bestOfTwo(mathematicsIntMarks[0], mathematicsIntMarks[1]);
  intB12MatEl.textContent = best12Mat;
  let best34Mat = bestOfTwo(mathematicsIntMarks[2], mathematicsIntMarks[3]);
  intB34MatEl.textContent = best34Mat;

  const computerScienceIntMarks = stInternals
    .filter((item) => item.ExamSubjectName === "COMPUTER SCIENCE")
    .map((item) => item.ScoredMarks);

  let best12Cs = bestOfTwo(
    computerScienceIntMarks[0],
    computerScienceIntMarks[1]
  );
  intB12CsEl.textContent = best12Cs;
  let best34Cs = bestOfTwo(
    computerScienceIntMarks[2],
    computerScienceIntMarks[3]
  );
  intB34CsEl.textContent = best34Cs;

  const socialStudiesIntMarks = stInternals
    .filter((item) => item.ExamSubjectName === "SOCIAL STUDIES")
    .map((item) => item.ScoredMarks);

  let best12Ss = bestOfTwo(socialStudiesIntMarks[0], socialStudiesIntMarks[1]);
  intB12SsEl.textContent = best12Ss;
  let best34Ss = bestOfTwo(socialStudiesIntMarks[2], socialStudiesIntMarks[3]);
  intB34SsEl.textContent = best34Ss;

  const teluguTermMarks = lstStudent
    .filter((item) => item.SubjectName === "TELUGU")
    .map((item) => item.Marks);
  term1TelEl.textContent = teluguTermMarks[0];
  term2TelEl.textContent = teluguTermMarks[1];

  const hindiTermMarks = lstStudent
    .filter((item) => item.SubjectName === "HINDI")
    .map((item) => item.Marks);
  term1HinEl.textContent = hindiTermMarks[0];
  term2HinEl.textContent = hindiTermMarks[1];

  const englishTermMarks = lstStudent
    .filter((item) => item.SubjectName === "ENGLISH")
    .map((item) => item.Marks);
  term1EngEl.textContent = englishTermMarks[0];
  term2EngEl.textContent = englishTermMarks[1];

  const mathematicsTermMarks = lstStudent
    .filter((item) => item.SubjectName === "MATHMATICS")
    .map((item) => item.Marks);
  term1MatEl.textContent = mathematicsTermMarks[0];
  term2MatEl.textContent = mathematicsTermMarks[1];

  const computerScienceTermMarks = lstStudent
    .filter((item) => item.SubjectName === "COMPUTER SCIENCE")
    .map((item) => item.Marks);
  term1CsEl.textContent = computerScienceTermMarks[0];
  term2CsEl.textContent = computerScienceTermMarks[1];

  const socialStudeisTermMarks = lstStudent
    .filter((item) => item.SubjectName === "SOCIAL STUDIES")
    .map((item) => item.Marks);
  term1SsEl.textContent = socialStudeisTermMarks[0];
  term2SsEl.textContent = socialStudeisTermMarks[1];

  let total1Tel = best12Tel + teluguTermMarks[0];
  let total1Hin = best12Hin + hindiTermMarks[0];
  let total1Eng = best12Eng + englishTermMarks[0];
  let total1Mat = best12Mat + mathematicsTermMarks[0];
  let total1Cs = best12Cs + computerScienceTermMarks[0];
  let total1Ss = best12Ss + socialStudeisTermMarks[0];

  let total2Tel = best34Tel + teluguTermMarks[1];
  let total2Hin = best34Hin + hindiTermMarks[1];
  let total2Eng = best34Eng + englishTermMarks[1];
  let total2Mat = best34Mat + mathematicsTermMarks[1];
  let total2Cs= best34Cs + computerScienceTermMarks[1];
  let total2Ss= best34Ss + socialStudeisTermMarks[1];

  total1TelEl.textContent = total1Tel
  total1HinEl.textContent = total1Hin
  total1EngEl.textContent = total1Eng
  total1MatEl.textContent = total1Mat
  total1CsEl.textContent = total1Cs
  total1SsEl.textContent = total1Ss

  total2TelEl.textContent = total2Tel
  total2HinEl.textContent = total2Hin
  total2EngEl.textContent = total2Eng
  total2MatEl.textContent = total2Mat
  total2CsEl.textContent = total2Cs
  total2SsEl.textContent = total2Ss

  let total12Tel = total1Tel + total2Tel
  let total12Hin = total1Hin + total2Hin
  let total12Eng = total1Eng + total2Eng
  let total12Mat = total1Mat + total2Mat
  let total12Cs = total1Cs + total2Cs
  let total12Ss = total1Ss + total2Ss

   total12TelEl.textContent = total12Tel
 total12HinEl.textContent = total12Hin
 total12EngEl.textContent = total12Eng
 total12MatEl.textContent = total12Mat
 total12CsEl.textContent = total12Cs
 total12SsEl.textContent = total12Ss

}

fetchData();
