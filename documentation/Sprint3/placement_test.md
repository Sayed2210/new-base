## fetch Placement Test

- fetch_placement_test

# Request

```json
{
    {
      "word"?: string,
      "with_pagination"?: number,
      "page"?: number,
      "per_page"?: number,
      "status"?: enum(inprogress,completed),
      "is_plan": bool,
      "dates"?: string,
    }
}
```

# Response

```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
     "id":number,
     "student":{
      "id":number,
      "name":string,
      "image":string
     },
     "result":number,
     "e_c_subject":{
      "id":number,
      "title":string,
      "childs":{
        "id":number,
        "title":string,
      }
     },
     "e_c_branch":{
      "id":number,
      "title":string,
      "childs":[{
        "id":number,
        "title":string,
      }]
     },
     "number_of_questions":number,
     "status":enum,
     "in_plan":boolean,
     "date":string


    }
  ]
}
```

#

## Show Placement Test

- show_placement_test

# Request

```json
{
    {
      "palcement_test_id"?: number,
    }
}
```

# Response

```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
     "id":number,
     "student":{
      "id":number,
      "name":string,
      "image":string
     },
     "e_c_branch":{
        "id":number,
        "title":string,
        "childs":{
            "id":number,
            "title":string,
            "childs":{
                "id":number,
                "title":string,
            }
        }
     },
      "e_c_subject":{
        "id":number,
        "title":string,
        "childs":{
            "id":number,
            "title":string,
            "childs":{
                "id":number,
                "title":string,
            }
        }
     },
     "date":string,
     "result_analysis":{
        "correct":number,
        "wrong":number,
        "Skipped":number,
        "total_rate":enum(good,excellent),
        "precentage":number
     },
     "time_analysis":{
      "start_time":string,
      "end_time":string,
      "actual_duration":string,
      "time_passed":string, // minutes
     },
     "question_answer_analysis":[
      {
        "question":{
          "id":number,
          "question":string
        },
        "question_answer_duration":number,
      }
     ],
      "questions_answered_difficulty_level":[
        {
          "difficulty_level": enum(easy,medium,hard)
          "mark":number,
        }
      ],
     "skills_analysis":[
      {
        "skill":{
          "id":number,
          "title":string,
          },
        "precentage":number,

      }
     ],
      "most_important_skills_analysis":[
      {
        "skill":{
          "id":number,
          "title":string,
          },
        "precentage":number,

      }
     ],
    "need_develop_skills_analysis":[
      {
        "skill":{
          "id":number,
          "title":string,
          },
        "precentage":number,

      }
     ],
    }
  ]
}
```
