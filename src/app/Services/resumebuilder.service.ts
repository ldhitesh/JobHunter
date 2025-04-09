import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ResumebuilderService {
  public doc=new jsPDF();
  private pageHeight:any=this.doc.internal.pageSize.height;
  private leftMargin = 8;
  private rightMargin = 202;
  private maxWidth = 210;
  public lineHeight = 6;
  constructor() { 
  }

  addHeader(curline:any,fullname:any,contact:any){
    let currLine=curline;
    this.doc.setFont("Times", "bold");
    this.doc.setFontSize(16);
    this.doc.text(fullname, 105, currLine, { align: "center" });
    currLine += this.lineHeight;
  
    this.doc.setFontSize(10);
    const wrappedTextLines = this.doc.splitTextToSize(contact, this.maxWidth -35);
    wrappedTextLines.forEach((ele:any) => {
      this.doc.text(ele, 105, currLine, { align: "center" });
      currLine+=4
    });
    
    this.addSolidLine(currLine);
    return currLine;
  }

  addUnderlineTitle = (title: string,line:any) => {
    let currLine=line;
    this.doc.setFont("Times", "bold");
    this.doc.setFontSize(12);
    const text = title.toUpperCase() + ":";
    const textWidth = this.doc.getTextWidth(text);
  
    this.doc.text(text, this.leftMargin,currLine);
    currLine += 1.0;
    this.doc.setDrawColor(0);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.leftMargin, currLine, this.leftMargin + textWidth, currLine); // underline just the title
    currLine +=this.lineHeight;
    return currLine
  };


  addBullet = (text: string,currLine:any) => {

    const bulletLeft = this.leftMargin + 5; // indent everything (bullet + text)
    const wrappedText = this.doc.splitTextToSize(`• ${text}`, this.maxWidth-16);
  
    for(let i=0;i<wrappedText.length;i++){
      if (currLine + this.lineHeight > this.pageHeight - 10) {
        this.doc.addPage();
        currLine = 20;
      }
      this.doc.setFont("Times", "normal");
      this.doc.setFontSize(10);
      if(i==0){
        this.doc.text(wrappedText[i], bulletLeft , currLine);
      }
      else{
        this.doc.text(wrappedText[i], bulletLeft+2 , currLine);
      }
      
      currLine += 4.5;
    };
    return currLine
  };


  //skills
  addBulletWithLabel = (label: string, text: string,line:any):any => {
    let currLine=line;

    const bulletLeft = this.leftMargin + 5;
    const rightMargin = 207;
    const maxWidth = rightMargin - bulletLeft;
    
    // Set up for width calculation
    this.doc.setFont("Times", "bold");
    this.doc.setFontSize(10.5);
    const labelWidth = this.doc.getTextWidth(`• ${label}`);
  
    // Wrap the text part (not the label)
    this.doc.setFont("Times", "normal");
    this.doc.setFontSize(10);
    const wrappedTextLines = this.doc.splitTextToSize(text, maxWidth - labelWidth-8);

    
    // Handle page break
    if (currLine + this.lineHeight * wrappedTextLines.length > this.pageHeight - 10) {
      this.doc.addPage();
      currLine = 20;
    }
  
    // Draw bullet
    this.doc.setFont("Times", "normal");
    this.doc.setFontSize(10);
    this.doc.text("•", bulletLeft, currLine);
  
    // Draw bold label
    this.doc.setFont("Times", "bold");
    this.doc.setFontSize(10.5);
    this.doc.text(label+": ", bulletLeft+2, currLine);
  
    // First line of text next to label
    this.doc.setFont("Times", "normal");
    this.doc.setFontSize(10);
    this.doc.text(wrappedTextLines[0], bulletLeft + labelWidth+2, currLine);
    currLine += 4.5;

    if(wrappedTextLines.length>1){
      let remaininglines="";
      for (let i = 1; i < wrappedTextLines.length; i++) {
        remaininglines+=wrappedTextLines[i];
      }      
      const wrappedTextLines1 = this.doc.splitTextToSize(remaininglines.replace(/\n/g, ' '), maxWidth - 1);
      // Remaining lines, fully indented
      for (let i = 0; i < wrappedTextLines1.length; i++) {
        if (currLine + this.lineHeight > this.pageHeight - 10) {
          this.doc.addPage();
          currLine = 20;
        }
        this.doc.text(wrappedTextLines1[i], bulletLeft+2, currLine);
        currLine += 4.5;
      }
    }
    return currLine;

  };

  //organization name and year
  addLeftRight = (left: string, right: string,currLine:any) => {
    currLine=currLine;

    if (currLine + this.lineHeight > this.pageHeight - 10) {
      this.doc.addPage();
      currLine = 20;
    }
    this.doc.setFont("Times", "bold");
    this.doc.setFontSize(10);
    const wrappedTextLines = this.doc.splitTextToSize(left, this.maxWidth -right.length-45);
    this.doc.text(wrappedTextLines[0], this.leftMargin , currLine);
    this.doc.text(right, this.rightMargin, currLine, { align: "right" });

    currLine +=4;

    if(wrappedTextLines.length>1){
      let remaininglines="";
      for (let i = 1; i < wrappedTextLines.length; i++) {
        remaininglines+=wrappedTextLines[i];
      }      
      const wrappedTextLines1 = this.doc.splitTextToSize(remaininglines.replace(/\n/g, ' '), this.maxWidth - this.leftMargin);
      // Remaining lines, fully indented
      for (let i = 0; i < wrappedTextLines1.length; i++) {
        if (currLine + this.lineHeight > this.pageHeight - 10) {
          this.doc.addPage();
          currLine = 20;
        }
        this.doc.text(wrappedTextLines1[i], this.leftMargin, currLine);
        if(i!=wrappedTextLines1.length-1)
          currLine +=3.5;
        else{
          currLine += 4;
        }
      }
    }
    return currLine
  };

  //education
  addBulletWithRightDate = (text: string, date: string,curline:any) => {
    let currLine=curline;
    const bulletLeft = this.leftMargin + 5;

    if (currLine + this.lineHeight >this.pageHeight - 10) {
      this.doc.addPage();
      currLine = 20;
    }
  
    this.doc.setFont("Times", "normal");
    this.doc.setFontSize(10);
    this.doc.text("•", bulletLeft, currLine);
  
    const wrappedTextLines = this.doc.splitTextToSize(text, this.maxWidth -date.length-45);
    this.doc.text(wrappedTextLines[0], bulletLeft+2, currLine);
    this.doc.setFont("Times","Bold")
    this.doc.text(date, this.rightMargin, currLine, { align: "right" });
    this.doc.setFont("Times","normal")

    if(wrappedTextLines.length==1)
      currLine +=4;
    else{
      currLine+=4
    }
    if(wrappedTextLines.length>1){
      let remaininglines="";
      for (let i = 1; i < wrappedTextLines.length; i++) {
        remaininglines+=wrappedTextLines[i];
      }      
      const wrappedTextLines1 = this.doc.splitTextToSize(remaininglines.replace(/\n/g, ' '), this.maxWidth - this.leftMargin);
      // Remaining lines, fully indented
      for (let i = 0; i < wrappedTextLines1.length; i++) {
        if (currLine + this.lineHeight > this.pageHeight - 10) {
          this.doc.addPage();
          currLine = 20;
        }
        this.doc.text(wrappedTextLines1[i],bulletLeft+2, currLine);
        currLine+=4
      }
    }
    return currLine
  };

   addSolidLine = (currLine:any) => {
    this.doc.setDrawColor(0);       // black
    this.doc.setLineWidth(0.3);     // thickness of the line
    this.doc.line(this.leftMargin, currLine, this.rightMargin, currLine); // horizontal line from left to right
    currLine+=this.lineHeight
    return currLine
  };
  
  setdoc(doc:any){
    this.doc=doc;
  }
  
}
