__author__ = 'developpeur'

import pandas as pd
import os
import numpy as np
from lxml import html


docs  = pd.read_csv("/home/developpeur/data_eurprl/votewatch_data/term_8/DOCS.csv",header=0)
texts = os.listdir("/home/developpeur/data_eurprl/europarl_texts/term_8")

docs.index = docs.votewatch_id.values
docs["content"] = None
for id in docs.votewatch_id.values:
    f = "/home/developpeur/data_eurprl/europarl_texts/term_8" + "/" + "Text_term8_" + str(id) + ".html"
    print(f)
    docs.ix[id,"content"] = open(f).read()

docs.columns = np.where(docs.columns == "id_document", "id_doc", docs.columns)
docs.columns = np.where(docs.columns == "Name.of.document", "title", docs.columns)
docs.columns = np.where(docs.columns == "Policy.area", "pol", docs.columns)
docs.columns = np.where(docs.columns == "URL_votewatch", "url_vw", docs.columns)
docs.columns = np.where(docs.columns == "URL_europarl", "url", docs.columns)
docs["language"] = "english"

for i in docs.index:
    s = docs.ix[i,:].content
    ht = re.findall("(<html.*?/html>)",s,flags=re.DOTALL)[0]
    el = html.fromstring(ht)
    st = el.xpath("/html/body/table/tr")[1].text_content()
    #st = re.sub("<.*?>"," ",st,flags=re.DOTALL)
    st = re.sub("\s+"," ",st,flags=re.DOTALL)
    docs.ix[i,"content"] = st


docs.to_csv("/home/developpeur/Bureau/vv/docs_ep4.csv",index=False)

