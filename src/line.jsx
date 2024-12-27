function LineComp({name,score}){
    return (
        <div className="flex flex-row justify-between text-sm border-b-2 border-b-gray-600 border-opacity-10 ">
            <div>
              {name}
            </div>
            <div>
              {score}
            </div>
          </div>
    );
}

export default LineComp;