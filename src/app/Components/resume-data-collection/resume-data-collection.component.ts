import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { GetDataService } from 'src/app/Services/get-data.service';

@Component({
    selector: 'resume-data-collection',
    templateUrl: './resume-data-collection.component.html',
    styleUrls: ['./resume-data-collection.component.css'],
    standalone: false
})
export class ResumeDataCollectionComponent {
  resumeData:any;
  currentStep: number = 1; // Tracks the current step/form
  dateFieldDisabled:any=false;
  previousdateSelection:any=[];

  @Output() dataSent: EventEmitter<string> = new EventEmitter<string>();

  contactForm: FormGroup = this.fb.group({}); 
  educationForm: FormGroup=this.fb.group({});
  skillsForm: FormGroup=this.fb.group({});
  experienceForm: FormGroup=this.fb.group({});

  certificate: string = '';  // Holds the input certificate value
  certificates: string[] = [];  // Array to store the added certificates

  constructor(    private fb: FormBuilder, 
                  private datePipe: DatePipe,
                  private getdata:GetDataService,
                  private authService:AuthService,
                  private http:HttpClient) { 
  }

  ngOnInit(): void {

    this.getResumeData();

    // Define form controls and their validators
    this.contactForm = this.fb.group({
      fullname: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', Validators.required],
      linkedin: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    // Initialize the education form with an empty array of education sections
    this.educationForm = this.fb.group({
      educationSections: this.fb.array([])
    });

    this.skillsForm = new FormGroup({
      categories: new FormArray([])  // This FormArray will contain all category forms
    });

    this.experienceForm = new FormGroup({
      workExperience: new FormArray([])  // This FormArray will contain all work experience sections
    });
  }

  getResumeData(){
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set content type to application/json
    });

    // Make the GET request with the user_id as a query parameter
    this.http.get<any>(`http://localhost:80/api/resume/getresumedata?user_id=${this.authService.email}`, { headers }).subscribe({
          next:(response:any) => {    
            if (response[0] && response[0].details) {
              response[0].details = JSON.parse(response[0].details);
            }
            this.resumeData=response[0].details;  
            this.setResumeValues()  
                   
          },
      error:(err:any) => {      
        console.log(err)
      }
    })
    
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  currentDateChecked(index:any,eduSection:any){
    eduSection.get('currdate')?.setValue(!eduSection.get('currdate')?.value);

    if(eduSection.get('currdate')?.value){
      eduSection.get('date')?.disable();
    }
    else{
      eduSection.get('date')?.enable();
    }
  }

   // Add a new education section (FormGroup) to the FormArray
   addEducation(): void {
    (this.educationForm.get('educationSections') as FormArray).push(this.createEducation());
    }

  // Get the education sections (FormArray) from the form group
    get educationSections() {
      return (this.educationForm.get('educationSections') as FormArray);
    }

    removeEducation(index:any){
      this.educationSections.controls.splice(index,1)  
      this.educationForm.value.educationSections.splice(index,1)  
    }
    createEducation(): FormGroup {
      return this.fb.group({
        major: ['', Validators.required],
        date: [''],
        currdate:[false],
        institution: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
      });
    }

  // Getter for categories FormArray
  get categories() {
    return (this.skillsForm.get('categories') as FormArray);
  }

  // Method to add a new category
  addNewCategory() {
    const categoryGroup = new FormGroup({
      category: new FormControl('', Validators.required),
      skill: new FormControl(''),
      skills: new FormArray([],Validators.required)  // FormArray to hold the skills for this category
    });

    this.categories.push(categoryGroup);  // Add the new category form group to the FormArray
  }

  removeCategory(index:any){
    this.skillsForm.value.categories.splice(index,1)
    this.categories.controls.splice(index,1)
  }
  // Method to add skill to the selected category
  addSkill(categoryIndex: number) {
    const skillControl = (this.categories.at(categoryIndex).get('skill') as FormControl);
    const skillsArray = (this.categories.at(categoryIndex).get('skills') as FormArray);

    if (skillControl.valid && skillControl.value.trim()) {
      skillsArray.push(new FormControl(skillControl.value));  // Add skill to the skills array
      skillControl.setValue('');  // Clear the skill input field after adding the skill
    }
  }

  // Method to remove a skill from a category
  removeSkill(categoryIndex: number, skillIndex: number) {
    const skillsArray = (this.categories.at(categoryIndex).get('skills') as FormArray);
    skillsArray.removeAt(skillIndex);   
    this.skillsForm.value.categories[categoryIndex].skills.splice(skillIndex,1)
  }



    // Getter for workExperience FormArray
    get workExperience() {
      return (this.experienceForm.get('workExperience') as FormArray);
    }
  
    // Method to add a new work experience section
    addWorkSection() {
      const workGroup = new FormGroup({
        company: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        date_range: new FormControl(''),
        startdate: new FormControl('', Validators.required),
        enddate: new FormControl(''),
        previosuselecteddate:new FormControl(''),
        responsibilty: new FormControl(''),
        responsibilities: new FormArray([]),
        currentselection:new FormControl(false)  // FormArray to hold the responsibilities for this work experience section
      });
  
      this.workExperience.push(workGroup);  // Add the new work experience form group to the FormArray
    }
    removeWorkExperience(index:any){
      this.workExperience.controls.splice(index,1)
      this.experienceForm.value.workExperience.splice(index,1)

    }
    // Method to add responsibility to the selected work experience
    addResponsibility(workIndex: number) {
      const responsibiltyControl = (this.workExperience.at(workIndex).get('responsibilty') as FormControl);
      const responsibilitiesArray = (this.workExperience.at(workIndex).get('responsibilities') as FormArray);
  
      if (responsibiltyControl.valid && responsibiltyControl.value.trim()) {
        responsibilitiesArray.push(new FormControl(responsibiltyControl.value));  // Add responsibility to the array
        responsibiltyControl.setValue('');  // Clear the responsibility input field after adding the responsibility
      }
    }

    assignedPreviousEndDate(index:any,work:any){
      work.get('previosuselecteddate').setValue(work.get('enddate').value);
    }
  
    currentWorkingDateChecked(index:any,event:any){
      
      this.workExperience.controls.forEach((work:any,i:any)=>{
        if(index!=i){
          work.get('currentselection')?.setValue(false);
          work.get('enddate').enable();
          work.get('enddate')?.setValue(work.get('previosuselecteddate').value);
        }
        else{
          work.get('currentselection')?.setValue(!work.value.currentselection);
          if(work.value.currentselection){
            const currentDate = new Date(); 
            work.get('previosuselecteddate')?.setValue(work.get('enddate').value);
            work.get('enddate')?.setValue(this.formatDate(currentDate));
            work.get('enddate')?.disable();
          }
          else{
            work.get('enddate').enable();
            work.get('enddate')?.setValue(work.get('previosuselecteddate').value);
          }
        }
      })
    }

    // Method to remove a responsibility from a work experience section
    removeResponsibility(workIndex: number, responsibilityIndex: number) {
      const responsibilitiesArray = (this.workExperience.at(workIndex).get('responsibilities') as FormArray);
      responsibilitiesArray.removeAt(responsibilityIndex);  // Remove the responsibility at the specified index
    }

    enableAddCertificateField:any=false;
    // Method to add the certificate to the certificates list
    addCertification() {
      this.enableAddCertificateField=true;
      if (this.certificate.trim().length > 0) {
        this.certificates.push(this.certificate.trim());  // Add the certificate to the list
        this.certificate = '';  // Clear the input field
      }
    }

    removeCertificate(index:any){
        this.certificates.splice(index,1)
        this.resumeData["certifications"]=this.certificates

    }
  isCurrentFormValid(): boolean {
    if (this.currentStep === 1) 
      {
      return this.contactForm.valid;
      } 
    else if (this.currentStep === 2) 
      {
      return this.validateEducationForm() ;
      }
    else if(this.currentStep === 3){
      if(this.categories.controls.length==0)
        return true;
      return this.skillsForm.valid;
    }
    else if(this.currentStep === 4){
      if(this.workExperience.controls.length==0)
        return true;
      return this.validateExpereinceForm();
    }
    else if(this.currentStep === 5){
      return true;
    }
    return false;
  }

  validateEducationForm(){
    let validation=true;
      this.educationSections.controls.forEach((element:any) => {
        if(element.valid && (element.value.currdate || element.value.date!='')){
          validation=true;
        }
        else{
          validation=false;
          return;
        }
      });
      return validation
  }

  validateExpereinceForm(){
    let validation=true;
    if(this.workExperience.controls.length==1 && 
      this.workExperience.controls[0].get('enddate')?.value=='' && 
      this.workExperience.controls[0].get('currentselection')?.value!=true)
      {
        validation= false;
      }
    else if(this.workExperience.controls.length>1)
      {
        this.workExperience.controls.forEach((work:any)=>{
          if(work.get('currentselection')?.value==false && work.get('enddate')?.value==''){
            validation= false
          }
        });
      }

    return validation;
  }

  setResumeValues(){
    this.contactForm.setValue(this.resumeData['contact'][0]);
    const educationArray = this.educationForm.get('educationSections') as FormArray;

    this.resumeData['education'].forEach((education:any) => {
      const educationGroup = this.fb.group(education);  
      educationArray.push(educationGroup);
    });

    this.resumeData.skills.forEach((skillSection: any) => {
      const categoryGroup = new FormGroup({
        category: new FormControl(skillSection.category, Validators.required), // Assuming skillSection has a category field
        skill: new FormControl(skillSection.skill), // Assuming skillSection has a skill field
        skills: new FormArray(skillSection.skills.map((skill: string) => new FormControl(skill))) // Convert skills array to FormControls
      });
      this.categories.push(categoryGroup);
    });

    this.resumeData.work_experience.forEach((worksection: any) => {
      const workGroup = new FormGroup({
        company: new FormControl(worksection.company, Validators.required),
        role: new FormControl(worksection.role, Validators.required),
        date_range: new FormControl(worksection.date_range),
        startdate: new FormControl(worksection.startdate, Validators.required),
        enddate: new FormControl(worksection.enddate),
        previosuselecteddate: new FormControl(worksection.previosuselecteddate),
        responsibilty: new FormControl(worksection.responsibilty),
        responsibilities: this.fb.array(worksection.responsibilities.map((res: string) => new FormControl(res))),
        currentselection: new FormControl(worksection.currentselection)  // Ensure it's a FormControl
      });

      this.workExperience.push(workGroup);
    });
    
    this.resumeData.certifications.forEach((certification: any) => {
      this.certificates.push(certification)
    });

    // this.resumeData["contact"] = [this.contactForm.value];
    // this.resumeData["education"] = this.educationForm.value.educationSections;   
    // this.resumeData["skills"]=this.skillsForm.value.categories
    // this.resumeData["work_experience"]=this.experienceForm.value.workExperience      
    // this.resumeData["certifications"]=this.certificates

  }

  prevStep(){
    this.currentStep-=1;
    if (this.currentStep === 1) 
    {
      this.contactForm.setValue(this.resumeData['contact'][0]);
    } 
    else if (this.currentStep === 2) 
    {
      this.resumeData['education'].forEach((eduSection:any) => {
        this.educationForm.setValue(eduSection);
      });
    }
    else if(this.currentStep === 3)
    {
      this.resumeData['skills'].forEach((skillSection:any) => {
        this.skillsForm.setValue(skillSection);
      });
    }
    else if(this.currentStep === 4)
    {
      this.resumeData['work_experience'].forEach((workSection:any) => {
        this.experienceForm.setValue(workSection);
      });
    }
    else if(this.currentStep === 5)
    {
      this.certificates=this.resumeData['certifications']
    }
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.contactForm.valid) {
      this.resumeData["contact"] = [this.contactForm.value];
    }
    else if(this.currentStep === 2 && this.educationForm.valid) {
      this.educationForm.value.educationSections.forEach((element:any) => {
        if(element.currdate){
          element.date=this.formatDate(new Date())
        }
        element.date=this.datePipe.transform(element.date, 'MMM yyyy');
      });
      this.resumeData["education"] = this.educationForm.value.educationSections;   
         
    }
    else if(this.currentStep === 3 && this.skillsForm.valid){      
      this.resumeData["skills"]=this.skillsForm.value.categories
      
    }
    else if(this.currentStep === 4 && this.experienceForm.valid){
      this.workExperience.controls.forEach((element:any) => {
        let endDate:any=element.value.enddate?this.datePipe.transform(element.value.enddate, 'MMM yyyy'):"Current";
        element.value.date_range=   this.datePipe.transform(element.value.startdate, 'MMM yyyy')+" - "+endDate;                         
      });
      this.resumeData["work_experience"]=this.experienceForm.value.workExperience      
    }
    else if(this.currentStep === 5 && this.certificate.length === 0){
      this.resumeData["certifications"]=this.certificates
    }
    
    this.currentStep++;
  }
  downloadResume(){    
    this.dataSent.emit(this.resumeData); 
  }

}
