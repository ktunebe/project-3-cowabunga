console.log('Worker started!')


    const handleEvalAnswer = data => {
      const testResults = []
      const userOutput = []
      const { codeToRun, answers, codeTests } = data

      let status = true
      for (i = 0; i < codeTests.length; i++) {
        const result = eval(`${codeToRun}  
          ${codeTests[i]}`)
        if (JSON.stringify(result).replaceAll(' ', '') == answers[i].replaceAll(' ', '')){
          testResults.push(true)
        } else {
          testResults.push(false)
          status = false
        }
        userOutput.push(result)
      }
      
    
      postMessage({ testResults, userOutput, status })
    }
    
    
    onmessage = e => {
      switch(e.data.type) {
        case 'EVAL_ANSWER':
          handleEvalAnswer(e.data)
      }
    }
