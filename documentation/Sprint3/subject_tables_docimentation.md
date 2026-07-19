## fetch subjects table

# Request

```json
{
    {
      "education_classification_id"?: 32,
      "e_c_branch_id"?: 32,
      "parent_id"?: 32,

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
      "id": 32,
      "title": "111",
      "childs": [
        {
          "id": 18,
          "title": "444",
          "childs": [
            {
              "id": 22,
              "title": "777",
              "childs": [
                {
                  "id": 14,
                  "title": "10.3_99",
                  "childs": [
                    {
                      "id": 19,
                      "title": "10.3.1_009"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
