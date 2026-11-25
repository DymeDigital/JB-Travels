import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
const bookingsByStatus = (S: Parameters<StructureResolver>[0], title: string, filter: string, params = {}) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType('booking')
        .filter(`_type == "booking" && ${filter}`)
        .params(params)
        .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Bookings')
        .child(
          S.list()
            .title('Bookings')
            .items([
              bookingsByStatus(S, 'New enquiries', 'status == "enquiry"'),
              bookingsByStatus(S, 'Awaiting payment', 'status == "quoted"'),
              bookingsByStatus(S, 'Paid', 'status == "paid"'),
              bookingsByStatus(S, 'Expired / cancelled', 'status in ["expired", "cancelled"]'),
              S.divider(),
              S.documentTypeListItem('booking').title('All bookings'),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'booking'),
    ])
