import React, { useEffect, useState } from "react";
import { useContentful } from "react-contentful";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import "./ContentFullEx.css";

const ContentFullEx = ({ contentId, metadata }) => {
  const [dataFormated, setDataFormated] = useState({});
  console.log("metadata1:", metadata);

  /*
  const [cf, setCf] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const dataById = await getMovies({
        content_type: "scripts",
        "sys.id": contentId,
      });
      console.log("script: ", dataById);
      setCf(dataById[0]);
    };

    fetchData().catch(console.error);
  }, []);

  console.log("cfScript: ", cf);
  */
  let { data, error, fetched, loading } = useContentful({
    contentType: "scripts",
    id: contentId,
  });

  useEffect(() => {
    if (data) {
      const resp = formatedContent(data?.fields?.content?.content, metadata);
      const copyData = { ...data };
      copyData.fields.content.content = Object.assign(
        data?.fields?.content?.content,
        resp
      );
      setDataFormated(copyData);
      console.log("resp: ", data);
    }
  }, [loading]);

  const formatedContent = (content, metadata) => {
    if (!!metadata) {
      let strContent = JSON.stringify(content);
      Object.keys(metadata).forEach((key) => {
        const value = metadata[key];
        console.log(`key: ${key}:: value: ${value}`);
        strContent = strContent.replace(new RegExp(`{{${key}}}`, "g"), value);
      });

      return JSON.parse(strContent);
    }
    return content;
  };

  if (loading || !fetched) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return <p>Page does not exist.</p>;
  }

  console.log("perro", data);

  const Bold = ({ children }) => <span className="blackText">{children}</span>;
  const Text = ({ children }) => <p className="Script1">{children}</p>;
  const List = ({ children }) => <ul className="ScriptList">{children}</ul>;
  const ListItem = ({ children }) => (
    <li className="ScriptListLi">{children}</li>
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <Text>{children}</Text>;
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return <List>{children}</List>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <ListItem>{children}</ListItem>;
      },
    },
  };

  return (
    <div className="ScritContent">
      {!loading ? (
        documentToReactComponents(dataFormated.fields?.content, options)
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ContentFullEx;
