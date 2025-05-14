import google.generativeai as genai
from journal_manager import load_journal_data
from dotenv import dotenv_values
from utils import calculate_scores
config=dotenv_values(".env")

genai.configure(api_key=config.get("API_KEY"))

generation_config = {
    "temperature": 0.15,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

def summarize_journal_entry():
    journal_data = load_journal_data()
    
    day_entries = " ".join(journal_data)

    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(f"Summarize the following journal entries in a format where it should give the highlights of the events (let it not be given in * * thing please do this) and let it be long and let the response not start with words like this was the summary etc. Just give the summary in an informal way: \"{day_entries}\"")
    response_text = response.text.replace("\n", " ")


    scores = calculate_scores(response_text)
    return response_text, scores
    
