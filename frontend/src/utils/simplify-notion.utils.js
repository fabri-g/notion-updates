// utils/simplify-notion.utils.js

export const simplifyNotionData = (page) => {
  // Simplify the properties of interest
  const simplifyProperties = (properties) => {
    const simpleProps = {};
    if (properties.Blocking.relation.length > 0) {
      simpleProps.Blocking = properties.Blocking.relation.map(rel => rel.id);
    }
    if (properties["Parent item"].relation.length > 0) {
      simpleProps.ParentItem = properties["Parent item"].relation.map(rel => rel.id);
    }
    if (properties["Sub-item"].relation.length > 0) {
      simpleProps.SubItem = properties["Sub-item"].relation.map(rel => rel.id);
    }
    simpleProps.Started = properties.Started.date?.start;
    if (properties["Description"].rich_text.length > 0) {
      simpleProps.Description = properties.Description.rich_text.map(text => text.plain_text).join(' ');
    }
    simpleProps.Domain = properties.Domain.multi_select.map(select => select.name);
    simpleProps.ETA = properties.ETA.date?.start;
    simpleProps.Priority = properties.Priority.select?.name;
    if (properties["Blocked by"].relation.length > 0) {
      simpleProps.BlockedBy = properties["Blocked by"].relation.map(rel => rel.id);
    }
    simpleProps.LastEditedTime = properties["Last edited time"].last_edited_time;
    simpleProps.Status = properties.Status.status?.name;
    if (properties.Owner.people.length > 0) {
      simpleProps.Owner = properties.Owner.people.map(person => person.id);
    }
    simpleProps.Type = properties.Type.select?.name;
    simpleProps.TaskTitle = properties.Task.title.map(title => title.text.content);

    return simpleProps;
  };

  return {
    id: page.id,
    created_time: page.created_time,
    last_edited_time: page.last_edited_time,
    properties: simplifyProperties(page.properties),
  };
}
