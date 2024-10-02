import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import quizz from '../../../assets/data/quizz.json'


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {

  title: string = quizz.title;
  questions: any = [];
  currentQuestion: any;
  selectedAnswers: { questionIndex: number; alias: string }[] = [];
  currentIndex: number = 0;
  questionMaxIndex: number = quizz.questions.length;
  finished: boolean = false;
  scoreA: number = 0;
  scoreB: number = 0;
  scoreC: number = 0;
  scoreD: number = 0;
  result: any;

  ngOnInit() {
    this.questions = quizz.questions;
    this.currentQuestion = this.questions[this.currentIndex];
  }

  selectOption(option: any) {
    this.selectedAnswers.push({ questionIndex: this.currentIndex, alias: option.alias });
    this.calculateScore(option.alias);

    this.currentIndex++;
    if (this.currentIndex < this.questionMaxIndex) {
      this.currentQuestion = this.questions[this.currentIndex];
    } else {
      this.finished = true;
      this.showResults();
    }
  }

  calculateScore(alias: string) {
    if (alias === 'A') {
      this.scoreA++;
    } else if (alias === 'B') {
      this.scoreB++;
    } else if (alias === 'C') {
      this.scoreC++;
    } else if (alias === 'D') {
      this.scoreD++;
    }
  }

  showResults() {
    if (this.scoreA > this.scoreB) {
      this.result = quizz.results.A;
    } else if ((this.scoreC > this.scoreA) && (this.scoreC > this.scoreB) ) {
      this.result = quizz.results.C;
    } else if ((this.scoreD > this.scoreC)) {
      this.result = quizz.results.D;
    } else {
      this.result = quizz.results.B;
    }
    console.log(`Resultado: ${this.result.house} - ${this.result.description}`);
  }




}
