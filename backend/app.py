from flask import Flask, request, jsonify,redirect
from flask_cors import CORS
from journal_manager import  process_journal_file
from ai_manager import summarize_journal_entry
import pymongo
from model import reply
from datetime import datetime


app = Flask(__name__)
CORS(app)


myclient = pymongo.MongoClient("mongodb://localhost:27017/JournalEntries")
mydb = myclient["Journal"]
mycol = mydb["Entries"] 

@app.route('/summarize_journal', methods=['GET'])
def summarize_day():
    try:
        # date = request.args.get("date", "2024-12-13")
        # print(date)
        
        summary, scores = summarize_journal_entry()

        chart_data = [
            {"session": 1, "Anxiety": scores["anxiety"], "Happiness": scores["happiness"]},
            {"session": 2, "Anxiety": scores["anxiety"] + 1, "Happiness": scores["happiness"] - 1},
            {"session": 3, "Anxiety": scores["anxiety"] - 1, "Happiness": scores["happiness"] + 2},
        ]

        response = {
            "summaries": [summary],  
            "scores": scores,
            "chartData": chart_data,
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}),500


@app.route("/upload",methods=["POST"])
def upload():
    entry=request.form.get("entry")
    title=request.form.get("title")
    print(entry,title)
    date=datetime.now().strftime("%x")
    ent=mycol.find_one({"Date":date})
    if not ent:
        mycol.insert_one({"Date":date,"enteries":[{"entry":entry,"title":title}]})
    else:
        print(req:=ent.get("enteries",[]),ent)
        req.append({"entry":entry,"title":title})
        print(req)
        mycol.update_one( {"Date": date},{"$set":{"enteries":req}})
    return redirect("http://localhost:3000/Entries")

@app.route("/Chat_response",methods=["POST"])
def chat():
    message=request.get_json()
    journals=mycol.find()
    "".join([i.get("Date")+i.get("enteries")[0].get("entry") for i in journals])
    response=reply(journal=journals,prompt="happy "+message["message"])
    print(response)
    return jsonify({"emotion":response})

if __name__ == "__main__":
    app.run(debug=True)
