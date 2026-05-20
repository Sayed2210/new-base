// Models
export { default as questionsModel } from './core/models/Article.model';

// Params
export { default as AddquestionsParams } from "./core/params/add.Artical.params";
export { default as EditquestionsParams } from "./core/params/edit.question.params";
export { default as DeletequestionsParams } from "./core/params/Articles.question.params";
export { default as ShowquestionsParams } from "./core/params/show.question.params";
export { default as IndexquestionsParams } from "./core/params/index.Articles.params";

// Repository
export { default as questionsRepository } from './data/repositories/Artical.repository';

// Controller
export { default as questionsController } from './presentation/controllers/questions.controller';

// API Service
export { default as questionsApiService } from './data/api/Artical.api-service';
