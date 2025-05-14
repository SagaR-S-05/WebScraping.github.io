import os
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])


def reply(journal,prompt):
    generation_config = {
    "temperature": 0.1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    # "response_mime_type": "text/plain",
    }
    model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction=f"""##Instructions##\nYour are a emotions understanding expert who can understand the user's mindset and you are going to be chatting with the user of the journal.\nYour name will what the user wants it to be.\n
    ##Role## \nyour role is too understand the emotions of the users (which is provided) and talk to them while keeping that in mind\n
    ##output structure##\nunderstand the question the user is asking\nif the user is asking about the dates of a event then based on the emotion of the user try to see if the event would effect him negatively\nif true then prompt the user too relax and cheer up\nelse just give the user what he or she wants.\nand if the user isn't asking anything related to the journal try to keep the response short (i.e., if the user isn't asking about any events or about the events of a certain day) .
    \n##Don'ts##\nrepeat what the user asked\ncheer up the user if the mood is positive\n
    ##Do's##\nmake 5 lines long response when in positive mood\nif user shows continuous signs of negative emotions then try helping him\n
    ##knowldge base##\n
    # {journal}""",
    )
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(prompt)
    print(response.text)
    return response.text